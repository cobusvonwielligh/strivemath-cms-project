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
