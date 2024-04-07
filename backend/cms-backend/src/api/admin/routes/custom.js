module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/create-author',
      handler: async (ctx) => {
        try {
          const { firstname, lastname, email, password, organizationId } = ctx.request.body;
          if (!firstname || !lastname || !email || !password || !organizationId) {
            return ctx.badRequest(`firstname, lastname, email, password and organization are required fields`);
          }

          // Check if the user already exists in the admin::user table
          const existingAdminUser = await strapi.query('admin::user').findOne({ where: { email: email } });
          if (existingAdminUser) {
            strapi.log.error(`Couldn't create author: ${email} already exists`);
            return ctx.badRequest(`${email} already exists`);
          }

          // Create the user in the admin::user table
          const hashedPassword = await strapi.admin.services.auth.hashPassword(password);
          const authorRole = await strapi.query('admin::role').findOne({ where: { code: 'strapi-author' } });
          const adminUserData = {
            firstname,
            lastname,
            email,
            password: hashedPassword,
            roles: [authorRole.id],
            blocked: false,
            isActive: true,
          };
          const adminUser = await strapi.query('admin::user').create({ data: { ...adminUserData } });

          // Create the duplicate user in the user collection type table
          const duplicateUserData = {
            username: email, // Assuming email is unique and can be used as username
            email,
            confirmed: true,
            role: 1, // Set the role to ContentCreator
            admin_user: adminUser.id, // Set the relation to the appropriate admin user
            organization: organizationId // Assign organizationId to the user
          };
          const duplicateUser = await strapi.query('plugin::users-permissions.user').create({ data:  { ...duplicateUserData } });

          // Assuming organizationId is valid and exists, and that the members field is correctly set up for relations
          // Fetch the organization along with its members
          const organization = await strapi.query('api::organization.organization').findOne({
            where: { id: organizationId },
            populate: ['members'], // Make sure this matches the relation field name in your Organization model
          });

          // Add the user to the organization's members
          if (organization && organization.members) {
            // If members already exist, append the new user; otherwise, create an array with the user
            const updatedMembers = organization.members.map(member => member.id);
            updatedMembers.push(duplicateUser.id); // Ensure this ID is correctly referencing the user's ID

            // Update the organization with the new members list
            await strapi.query('api::organization.organization').update({
              where: { id: organizationId },
              data: { members: updatedMembers },
            });
          } else {
            // Handle cases where the organization is not found or the members field doesn't exist
            strapi.log.error(`Organization not found or doesn't have a members field.`);
          }

          strapi.log.info(`Created author: ${firstname} ${lastname} (${email})`);
          return ctx.send({ message: 'Author created successfully!', details: { adminUser, duplicateUser } }, 200);
        } catch (err) {
          return ctx.internalServerError(err.message);
        }
      },
      config: {
        auth: false,
      },
    },
  ],
};
