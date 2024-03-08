require("dotenv").config({ path: ".env.production" });

module.exports = {
  apps: [
    {
      name: process.env.NEXT_PUBLIC_PROJECT_NAME,
      script: "npm",
      args: "start",
      env: {
        PORT: process.env.PORT,
      },
    },
  ],
};
