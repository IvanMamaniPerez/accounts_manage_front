#!/bin/bash

# Script dnuxt para gestionar Docker Compose y comandos Node

# Función para mostrar la ayuda
show_help() {
    echo "Uso: dnuxt [entorno] [comando] [opciones]"
    echo
    echo "Entornos:"
    echo "  dev   Ejecutar comandos en el entorno de desarrollo"
    echo "  prod  Ejecutar comandos en el entorno de producción"
    echo "  <entorno>  Ejecutar comandos para un entorno específico"
    echo
    echo "Comandos:"
    echo "  up      Inicia los servicios especificados"
    echo "  down    Detiene los servicios especificados"
    echo "  npm     Ejecuta un comando npm dentro del contenedor"
    echo "  node    Ejecuta un comando node dentro del contenedor"
    echo "  help    Muestra esta ayuda"
    echo
    echo "Ejemplos:"
    echo "  dnuxt dev up -d                   # Iniciar servicios de desarrollo"
    echo "  dnuxt prod down                   # Detener servicios de producción"
    echo "  dnuxt staging npm install express # Instalar express en staging"
    echo "  dnuxt testing node script.js      # Ejecutar script.js en testing"
    echo "  dnuxt help                        # Mostrar esta ayuda"
}

# Verificar si hay argumentos
if [[ $# -eq 0 ]]; then
    show_help
    exit 1
fi

# Mostrar ayuda si el primer argumento es help o -h
if [[ $1 == "help" || $1 == "-h" ]]; then
    show_help
    exit 0
fi

# Configurar el entorno de Docker Compose según el primer argumento
ENVIRONMENT=$1

# Buscar el archivo docker-compose con .yml o .yaml en la raíz o en la carpeta dockerfiles
if [[ -f "docker-compose.${ENVIRONMENT}.yml" ]]; then
    COMPOSE_FILE="docker-compose.${ENVIRONMENT}.yml"
elif [[ -f "docker-compose.${ENVIRONMENT}.yaml" ]]; then
    COMPOSE_FILE="docker-compose.${ENVIRONMENT}.yaml"
elif [[ -f "dockerfiles/docker-compose.${ENVIRONMENT}.yml" ]]; then
    COMPOSE_FILE="dockerfiles/docker-compose.${ENVIRONMENT}.yml"
elif [[ -f "dockerfiles/docker-compose.${ENVIRONMENT}.yaml" ]]; then
    COMPOSE_FILE="dockerfiles/docker-compose.${ENVIRONMENT}.yaml"
else
    echo "Archivo de configuración no encontrado: docker-compose.${ENVIRONMENT}.yml or docker-compose.${ENVIRONMENT}.yaml"
    echo "Asegúrate de que el archivo existe en la raíz o en la carpeta 'dockerfiles'."
    exit 1
fi

# Construir el nombre del proyecto
PROJECT_NAME="dnuxt_${ENVIRONMENT}"

# Construir el nombre del servicio
SERVICE_NAME="app-${ENVIRONMENT}"

# Manejar los comandos adicionales como up/down/npm/node
case $2 in
    up)
        echo "Iniciando entorno $ENVIRONMENT con el proyecto $PROJECT_NAME..."
        docker compose -p $PROJECT_NAME -f $COMPOSE_FILE up "${@:3}"
        ;;
    down)
        echo "Deteniendo entorno $ENVIRONMENT con el proyecto $PROJECT_NAME..."
        docker compose -p $PROJECT_NAME -f $COMPOSE_FILE down "${@:3}"
        ;;
    npm)
        # Ejecutar npm install o cualquier otro comando npm dentro del contenedor
        if [[ $# -lt 3 ]]; then
            echo "Uso: dnuxt $1 npm <comando>"
            exit 1
        fi
        echo "Ejecutando npm ${@:3} en el entorno $ENVIRONMENT con el proyecto $PROJECT_NAME..."
        docker compose -p $PROJECT_NAME -f $COMPOSE_FILE exec $SERVICE_NAME npm "${@:3}"
        ;;
    node)
        # Ejecutar cualquier comando node dentro del contenedor
        if [[ $# -lt 3 ]]; then
            echo "Uso: dnuxt $1 node <comando>"
            exit 1
        fi
        echo "Ejecutando node ${@:3} en el entorno $ENVIRONMENT con el proyecto $PROJECT_NAME..."
        docker compose -p $PROJECT_NAME -f $COMPOSE_FILE exec $SERVICE_NAME node "${@:3}"
        ;;
    *)
        echo "Comando desconocido: $2"
        echo "Comandos disponibles: up, down, npm, node, help"
        exit 1
        ;;
esac
