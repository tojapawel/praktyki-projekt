FROM php:apache

# Install the mysqli extension
RUN docker-php-ext-install mysqli
