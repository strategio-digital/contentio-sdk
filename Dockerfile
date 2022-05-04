FROM wyveo/nginx-php-fpm:php81

WORKDIR /usr/share/nginx/html
EXPOSE 80

# Set timezone
ENV TZ="Europe/Prague"

# Copy project files, Nginx configs & PHP configs
COPY . /usr/share/nginx/html
COPY ./docker/nginx /etc/nginx
COPY ./docker/php/8.1/cli/php.ini /etc/php/8.1/cli/php.ini
COPY ./docker/php/8.1/fpm/php.ini /etc/php/8.1/fpm/php.ini
COPY ./docker/php/8.1/fpm/php.ini /etc/php/8.1/fpm/php-fpm.conf
COPY ./docker/php/8.1/fpm/pool.d/www.conf /etc/php/8.1/fpm/pool.d/www.conf

# Apt packages update
RUN apt-get update && apt-get install -y \
    zip git \
    libicu-dev \
    curl \
    gnupg

# NodeJS
RUN curl -sL https://deb.nodesource.com/setup_17.x | bash - \
    && apt-get update && apt-get install -y nodejs && npm i npm -g

# Yarn
RUN corepack enable

# Permissions
RUN chmod -R ugo+w ./temp
RUN chmod -R ugo+w ./log
RUN mkdir -p ./www/temp && chmod -R ugo+rw ./www/temp

# Install and build dependencies
RUN composer install --prefer-dist --no-scripts && rm -rf /root/.composer
RUN yarn
RUN yarn prod

# Remove node_modules & docker folder
RUN rm -rf ./node_modules
RUN rm -rf ./docker

# Resolve permissions
RUN chown -R www-data:www-data /usr/share/nginx/html