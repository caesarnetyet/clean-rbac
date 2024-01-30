FROM php:8.1-alpine as baseImage

COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

RUN docker-php-ext-install pdo_mysql bcmath

WORKDIR /app

COPY . .

RUN composer install

COPY .docker.env .env

RUN php artisan key:generate

EXPOSE 8000

CMD [ "php", "artisan", "serve", "--host=0.0.0.0" ]
