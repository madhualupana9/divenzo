# Use official PHP image with Apache server
FROM php:8.2-apache

# Copy your project files to Apache's web root
COPY . /var/www/html/

# Enable Apache URL rewrite (optional, safe to include)
RUN a2enmod rewrite

# Set permissions (optional for general PHP apps)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose default web port
EXPOSE 80
