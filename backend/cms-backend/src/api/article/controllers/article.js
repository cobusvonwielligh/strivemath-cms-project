'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  // Override the default 'find' method to add custom logic
  async find(ctx) {
    console.log("Custom find method called");
    const user = ctx.state.user;

    if (user && user.role.name !== 'SuperAdmin') {
      ctx.query.filters = {
        ...ctx.query.filters,
        organization: user.organization,
      };
    }

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  // Override the 'findOne' method with similar logic for consistency
  async findOne(ctx) {
    console.log("Custom findOne method called");
    const { id } = ctx.params;
    const user = ctx.state.user;

    if (user && user.role.name !== 'SuperAdmin') {
      const article = await strapi.entityService.findOne("api::article.article", id, {
        populate: { organization: true },
      });

      if (!article || (article.organization && article.organization.id !== user.organization.id)) {
        return ctx.notFound('Article not found within your organization.');
      }
    }

    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  },
}));
