FROM node:12

COPY ["package.json", "package-lock.json", "/home/apps/xr3dpixel/"]

WORKDIR /home/apps/xr3dpixel/

RUN npm install

RUN npm install pm2 -g

COPY [".", "/home/apps/xr3dpixel/"]

EXPOSE 5000

# ### DEVELOPMENT
# CMD ["npx", "nodemon", "./src/server.js"] // platziapp:v1.0.0
# supremeapp:v1.1.0

# ### PRODUCTION
CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"] 

