FROM mcr.microsoft.com/playwright:v1.53.1-noble

#create app folder
RUN mkdir /app
# navigate to app folder
WORKDIR /app
# copy all source from root folder to app 
COPY . /app/

RUN npm install --force
RUN npx playwright install
