#!/bin/bash
# Script de ayuda para tests del Portfolio Manager

echo "=========================================="
echo "📊 Test Suite Helper - Portfolio Manager"
echo "=========================================="
echo ""

# Función para mostrar menu
show_menu() {
    echo "Selecciona una opción:"
    echo "1. Ejecutar todos los tests"
    echo "2. Ejecutar tests en modo watch"
    echo "3. Ver reporte de cobertura"
    echo "4. Ejecutar test específico"
    echo "5. Ejecutar tests con salida detallada"
    echo "6. Ver documentación de testing"
    echo "7. Salir"
    echo ""
    read -p "Opción: " choice
}

# Procesamiento de opciones
case $choice in
    1)
        echo "🧪 Ejecutando todos los tests..."
        npm test
        ;;
    2)
        echo "👀 Iniciando modo watch..."
        npm run test:watch
        ;;
    3)
        echo "📈 Generando reporte de cobertura..."
        npm run test:coverage
        ;;
    4)
        read -p "Ingresa el nombre del archivo de test: " testfile
        echo "🧪 Ejecutando $testfile..."
        npm test -- "$testfile"
        ;;
    5)
        echo "📝 Ejecutando con salida detallada..."
        npm test -- --verbose
        ;;
    6)
        echo "📖 Abriendo documentación..."
        if command -v start &> /dev/null; then
            start TESTING_GUIDE.md
        elif command -v open &> /dev/null; then
            open TESTING_GUIDE.md
        else
            cat TESTING_GUIDE.md
        fi
        ;;
    7)
        echo "¡Hasta luego!"
        exit 0
        ;;
    *)
        echo "❌ Opción inválida"
        ;;
esac

echo ""
read -p "¿Deseas hacer otra cosa? (s/n): " continue
if [ "$continue" = "s" ] || [ "$continue" = "S" ]; then
    show_menu
fi
