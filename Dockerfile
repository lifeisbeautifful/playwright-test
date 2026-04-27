FROM mcr.microsoft.com/playwright:v1.59.1-noble

#create app folder
#RUN mkdir /app
# navigate to app folder and create if not exist
WORKDIR /app

# Копіюємо лише файли зі списком залежностей
COPY package*.json ./

# Встановлюємо їх з вашим прапорцем (цей шар збережеться в кеші)
RUN npm install --force

# Копіюємо в папку з тестами пекедж джсон
COPY tests/package*.json ./tests/

# Переходимо в папку тестів та інсталимо їх залежності
RUN cd tests && npm ci

# Копіюємо решту файлів проекту (тести, конфіги)
COPY . .

WORKDIR /app/tests


#RUN npm install --force
#RUN npx playwright install
