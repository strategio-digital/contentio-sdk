FROM php:8.1-apache

# Set timezone
#ENV TZ="Europe/Prague"

# Apt packages update
RUN apt-get update && apt-get install -y \
    zip git \
    libpq-dev \
    libicu-dev

# Install and configure PHP extensions
#RUN docker-php-ext-install zip
#RUN docker-php-ext-install mysqli
RUN docker-php-ext-configure intl
RUN docker-php-ext-install intl
RUN a2enmod rewrite

# NodeJS 17
RUN curl -sL https://deb.nodesource.com/setup_17.x | bash - \
    && apt-get update && apt-get install -y nodejs && npm i npm -g

# Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpKg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install yarn

# Composer
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php
RUN php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# Add docker-entrypoint file
#ADD docker-entrypoint.sh /docker-entrypoint.sh
#RUN chmod +x /docker-entrypoint.sh

# Resolve permissions
#RUN chown -R www-data:www-data /var/www/html

# Set entrypoint file
#ENTRYPOINT ["/docker-entrypoint.sh"]