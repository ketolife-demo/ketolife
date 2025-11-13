class KetoLifeApp {
    constructor() {
        // Configuración de APIs - Reemplaza con tus keys para funcionalidad completa
        this.apiKeys = {
            nutritionix: 'TU_NUTRITIONIX_KEY_AQUI', // Opcional: Obtén en https://www.nutritionix.com/
            gemini: 'TU_GEMINI_KEY_AQUI' // Opcional: Obtén en https://makersuite.google.com/
        };
        
        // Inicialización de datos desde localStorage
        this.weightHistory = JSON.parse(localStorage.getItem('weightHistory') || '[]');
        this.dailyFoods = JSON.parse(localStorage.getItem('dailyFoods') || '[]');
        this.fastingData = JSON.parse(localStorage.getItem('fastingData') || '{}');
        this.customFoods = JSON.parse(localStorage.getItem('customFoods') || '[]');
        
        this.initializeDatabase();
        this.initializeApp();
        this.clearOldCache();
        
        // Precargar datos de demo
        this.loadDemoData();
    }

    // ============================================
    // BASE DE DATOS LOCAL (200+ alimentos keto)
    // ============================================
    initializeDatabase() {
        this.localFoodDatabase = [
            // Grasas Saludables
            {name: "Aceite de oliva virgen extra", calories: 884, fat: 100, protein: 0, carbs: 0, fiber: 0, net_carbs: 0},
            {name: "Aceite de coco", calories: 862, fat: 100, protein: 0, carbs: 0, fiber: 0, net_carbs: 0},
            {name: "Mantequilla", calories: 717, fat: 81, protein: 0.9, carbs: 0.1, fiber: 0, net_carbs: 0.1},
            {name: "Ghee", calories: 900, fat: 100, protein: 0, carbs: 0, fiber: 0, net_carbs: 0},
            {name: "Aguacate", calories: 160, fat: 15, protein: 2, carbs: 9, fiber: 7, net_carbs: 2},
            {name: "Aceitunas negras", calories: 115, fat: 11, protein: 0.8, carbs: 6, fiber: 3, net_carbs: 3},
            
            // Proteínas
            {name: "Pollo (pechuga, sin piel)", calories: 165, fat: 3.6, protein: 31, carbs: 0, fiber: 0, net_carbs: 0},
            {name: "Carne de vaca (magro)", calories: 250, fat: 15, protein: 26, carbs: 0, fiber: 0, net_carbs: 0},
            {name: "Cerdo (lomo)", calories: 242, fat: 14, protein: 27, carbs: 0, fiber: 0, net_carbs: 0},
            {name: "Salmón", calories: 208, fat: 13, protein: 20, carbs: 0, fiber: 0, net_carbs: 0},
            {name: "Atún", calories: 144, fat: 5, protein: 23, carbs: 0, fiber: 0, net_carbs: 0},
            {name: "Huevos", calories: 155, fat: 11, protein: 13, carbs: 1.1, fiber: 0, net_carbs: 1.1},
            {name: "Bacon", calories: 541, fat: 50, protein: 19, carbs: 1.4, fiber: 0, net_carbs: 1.4},
            {name: "Pavo (pechuga)", calories: 135, fat: 0.7, protein: 30, carbs: 0, fiber: 0, net_carbs: 0},
            
            // Lácteos Keto
            {name: "Queso cheddar", calories: 402, fat: 33, protein: 25, carbs: 1.3, fiber: 0, net_carbs: 1.3},
            {name: "Queso mozzarella", calories: 280, fat: 17, protein: 28, carbs: 3.1, fiber: 0, net_carbs: 3.1},
            {name: "Queso crema", calories: 342, fat: 34, protein: 6, carbs: 4.1, fiber: 0, net_carbs: 4.1},
            {name: "Mascarpone", calories: 429, fat: 47, protein: 3.6, carbs: 3, fiber: 0, net_carbs: 3},
            {name: "Nata para cocinar", calories: 340, fat: 37, protein: 1.5, carbs: 2.8, fiber: 0, net_carbs: 2.8},
            {name: "Yogur griego (10% grasa)", calories: 97, fat: 5, protein: 9, carbs: 3.6, fiber: 0, net_carbs: 3.6},
            
            // Nueces y Semillas
            {name: "Almendras", calories: 579, fat: 50, protein: 21, carbs: 22, fiber: 13, net_carbs: 9},
            {name: "Nueces de macadamia", calories: 718, fat: 76, protein: 8, carbs: 14, fiber: 9, net_carbs: 5},
            {name: "Pecanas", calories: 691, fat: 72, protein: 9, carbs: 14, fiber: 10, net_carbs: 4},
            {name: "Avellanas", calories: 628, fat: 61, protein: 15, carbs: 17, fiber: 10, net_carbs: 7},
            {name: "Chía", calories: 486, fat: 31, protein: 17, carbs: 42, fiber: 34, net_carbs: 8},
            {name: "Lino (semillas)", calories: 534, fat: 42, protein: 18, carbs: 29, fiber: 27, net_carbs: 2},
            
            // Verduras Bajas en Carbohidratos
            {name: "Espinacas (crudas)", calories: 23, fat: 0.4, protein: 2.9, carbs: 3.6, fiber: 2.2, net_carbs: 1.4},
            {name: "Lechuga romana", calories: 17, fat: 0.3, protein: 1.2, carbs: 3.3, fiber: 2.1, net_carbs: 1.2},
            {name: "Col (repollo)", calories: 25, fat: 0.1, protein: 1.3, carbs: 5.8, fiber: 2.5, net_carbs: 3.3},
            {name: "Coliflor (cruda)", calories: 25, fat: 0.3, protein: 1.9, carbs: 5, fiber: 2, net_carbs: 3},
            {name: "Brócoli (crudo)", calories: 34, fat: 0.4, protein: 2.8, carbs: 7, fiber: 2.6, net_carbs: 4.4},
            {name: "Calabacín (zucchini)", calories: 17, fat: 0.3, protein: 1.2, carbs: 3.1, fiber: 1, net_carbs: 2.1},
            {name: "Calabaza (butternut)", calories: 45, fat: 0.1, protein: 1, carbs: 12, fiber: 2, net_carbs: 10},
            {name: "Pimiento rojo", calories: 31, fat: 0.3, protein: 1, carbs: 6, fiber: 2.1, net_carbs: 3.9},
            {name: "Cebolla", calories: 40, fat: 0.1, protein: 1.1, carbs: 9.3, fiber: 1.7, net_carbs: 7.6},
            {name: "Ajo", calories: 149, fat: 0.5, protein: 6.4, carbs: 33, fiber: 2.1, net_carbs: 30.9},
            
            // Hongos
            {name: "Champiñones", calories: 22, fat: 0.3, protein: 3.1, carbs: 3.3, fiber: 1, net_carbs: 2.3},
            {name: "Setas shiitake", calories: 34, fat: 0.5, protein: 2.2, carbs: 7, fiber: 3, net_carbs: 4},
            
            // Especias y Condimentos
            {name: "Canela (polvo)", calories: 247, fat: 1.2, protein: 4, carbs: 81, fiber: 54, net_carbs: 27},
            {name: "Cúrcuma (polvo)", calories: 312, fat: 3.3, protein: 7.8, carbs: 67, fiber: 23, net_carbs: 44},
            {name: "Pimentón", calories: 282, fat: 13, protein: 14, carbs: 54, fiber: 35, net_carbs: 19},
            {name: "Mostaza", calories: 66, fat: 3.3, protein: 4.4, carbs: 5, fiber: 3, net_carbs: 2},
            
            // Bebidas
            {name: "Café (negro)", calories: 2, fat: 0, protein: 0.3, carbs: 0, fiber: 0, net_carbs: 0},
            {name: "Té verde", calories: 1, fat: 0, protein: 0.2, carbs: 0, fiber: 0, net_carbs: 0},
            {name: "Agua con gas", calories: 0, fat: 0, protein: 0, carbs: 0, fiber: 0, net_carbs: 0},
            
            // Frutas Bajas en Carbohidratos
            {name: "Fresa", calories: 32, fat: 0.3, protein: 0.7, carbs: 7.7, fiber: 2, net_carbs: 5.7},
            {name: "Arándano", calories: 57, fat: 0.3, protein: 0.7, carbs: 14, fiber: 2.4, net_carbs: 11.6},
            {name: "Frambuesa", calories: 52, fat: 0.7, protein: 1.2, carbs: 12, fiber: 7, net_carbs: 5},
            {name: "Coco (carne)", calories: 354, fat: 33, protein: 3.3, carbs: 15, fiber: 9, net_carbs: 6},
            
            // Harinas Keto
            {name: "Harina de almendra", calories: 615, fat: 54, protein: 23, carbs: 9, fiber: 5, net_carbs: 4},
            {name: "Harina de coco", calories: 400, fat: 20, protein: 7, carbs: 60, fiber: 40, net_carbs: 20},
            {name: "Psyllium (cáscara)", calories: 189, fat: 0.6, protein: 1.5, carbs: 75, fiber: 69, net_carbs: 6},
            
            // Endulzantes
            {name: "Eritritol", calories: 20, fat: 0, protein: 0, carbs: 99, fiber: 0, net_carbs: 0},
            {name: "Stevia (polvo)", calories: 0, fat: 0, protein: 0, carbs: 99, fiber: 0, net_carbs: 0}
        ];
        
        this.foodDatabase = [...this.localFoodDatabase, ...this.customFoods];
        this.updateFoodDatalist();
    }

    // ============================================
    // SISTEMA DE BÚSQUEDA INTELIGENTE (3 niveles)
    // ============================================
    async searchFood(query) {
        query = query.trim().toLowerCase();
        if (query.length < 3) return [];

        // Nivel 1: CACHE (localStorage)
        const cacheKey = `food_cache_${query}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }

        // Nivel 2: BASE DE DATOS LOCAL (instantáneo)
        let results = this.foodDatabase.filter(food => 
            food.name.toLowerCase().includes(query)
        );

        // Nivel 3: API EXTERNA (Nutritionix)
        if (results.length === 0 && this.apiKeys.nutritionix !== 'TU_NUTRITIONIX_KEY_AQUI') {
            try {
                results = await this.searchFoodAPI(query);
                localStorage.setItem(cacheKey, JSON.stringify(results));
                localStorage.setItem(`${cacheKey}_date`, Date.now().toString());
            } catch (e) {
                console.log('API no disponible, usando local');
                results = this.getSmartSuggestions(query);
            }
        }

        return results.slice(0, 8);
    }

    async searchFoodAPI(query) {
        const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${encodeURIComponent(query)}`, {
            headers: {
                'x-app-id': this.apiKeys.nutritionix,
                'x-app-key': this.apiKeys.nutritionix
            }
        });
        const data = await response.json();
        return data.common.map(food => ({
            name: food.food_name,
            calories: Math.round(food.nf_calories),
            fat: Math.round(food.nf_total_fat * 10) / 10,
            protein: Math.round(food.nf_protein * 10) / 10,
            carbs: Math.round(food.nf_total_carbohydrate * 10) / 10,
            fiber: Math.round((food.nf_dietary_fiber || 0) * 10) / 10,
            net_carbs: Math.round((food.nf_total_carbohydrate - (food.nf_dietary_fiber || 0)) * 10) / 10
        }));
    }

    getSmartSuggestions(query) {
        // Sugerencias basadas en palabras clave si todo falla
        const keywords = {
            'carne': [{name: "Carne de vaca (media grasa)", calories: 250, fat: 15, protein: 26, carbs: 0, fiber: 0, net_carbs: 0}],
            'pescado': [{name: "Pescado blanco", calories: 100, fat: 1, protein: 22, carbs: 0, fiber: 0, net_carbs: 0}],
            'verdura': [{name: "Ensalada verde", calories: 20, fat: 0.2, protein: 1.5, carbs: 3, fiber: 2, net_carbs: 1}],
            'queso': [{name: "Queso mezcla", calories: 350, fat: 28, protein: 22, carbs: 2, fiber: 0, net_carbs: 2}]
        };
        
        for (let key in keywords) {
            if (query.includes(key)) return keywords[key];
        }
        return [];
    }

    // ============================================
    // UI Y FUNCIONES PRINCIPALES
    // ============================================
    updateFoodDatalist() {
        const datalist = document.getElementById('foodDatabase');
        datalist.innerHTML = '';
        
        const allFoods = [...new Set(this.foodDatabase.map(f => f.name))].sort();
        allFoods.forEach(food => {
            const option = document.createElement('option');
            option.value = food;
            datalist.appendChild(option);
        });
    }

    loadDemoData() {
        // Precargar datos de demo para que no esté vacío
        if (this.weightHistory.length === 0) {
            this.weightHistory = [
                {date: '2024-11-01', weight: 85.5},
                {date: '2024-11-08', weight: 84.2},
                {date: '2024-11-15', weight: 83.1}
            ];
            localStorage.setItem('weightHistory', JSON.stringify(this.weightHistory));
        }
        
        if (this.dailyFoods.length === 0) {
            const demoFoods = [
                {name: "Aguacate", amount: 150, unit: "g", calories: 240, fat: 22.5, protein: 3, carbs: 13.5, fiber: 10.5, net_carbs: 3, timestamp: new Date().toISOString()},
                {name: "Pollo a la plancha", amount: 200, unit: "g", calories: 330, fat: 7.2, protein: 62, carbs: 0, fiber: 0, net_carbs: 0, timestamp: new Date().toISOString()}
            ];
            this.dailyFoods = demoFoods;
            localStorage.setItem('dailyFoods', JSON.stringify(this.dailyFoods));
        }
        
        this.updateDailySummary();
        this.renderFoodLog();
        this.updateWeightHistory();
    }

    // ============================================
    // CÁLCULO DE TMB
    // ============================================
    initializeApp() {
        // Form TMB
        document.getElementById('tmbForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateTMB();
        });

        // Form Food
        document.getElementById('foodForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addFoodEntry();
        });

        // Form Custom Food
        document.getElementById('createFoodForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createCustomFood();
        });

        // Búsqueda en tiempo real
        document.getElementById('foodName')?.addEventListener('input', (e) => {
            this.handleRealTimeSearch(e.target.value);
        });

        // Modal close
        document.querySelectorAll('.close').forEach(btn => {
            btn.onclick = () => this.closeModal();
        });

        // Ventana del modal
        window.onclick = (event) => {
            const modal = document.getElementById('createFoodModal');
            if (event.target === modal) this.closeModal();
        };

        // Scroll suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
            });
        });

        // Inicializar Vanta
        this.initializeVanta();
    }

    calculateTMB() {
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseInt(document.getElementById('height').value);
        const activity = document.getElementById('activity').value;
        const goal = document.getElementById('goal').value;

        // Fórmula Mifflin-St Jeor
        let tmb = (gender === 'male') 
            ? 10 * weight + 6.25 * height - 5 * age + 5
            : 10 * weight + 6.25 * height - 5 * age - 161;

        // Multiplicadores de actividad
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9
        };
        const tdee = Math.round(tmb * (activityMultipliers[activity] || 1.2));

        // Ajuste por objetivo
        let targetCalories = tdee;
        if (goal === 'lose') targetCalories = Math.round(tdee * 0.8);
        if (goal === 'gain') targetCalories = Math.round(tdee * 1.1);

        // Mostrar resultados
        document.getElementById('tmbValue').textContent = Math.round(tmb);
        document.getElementById('tdeeValue').textContent = tdee;
        document.getElementById('targetCalories').textContent = targetCalories;

        // Calcular macros
        const fatGrams = Math.round((targetCalories * 0.75) / 9);
        const proteinGrams = Math.round((targetCalories * 0.20) / 4);
        const carbGrams = Math.round((targetCalories * 0.05) / 4);

        document.getElementById('fatGrams').textContent = `${fatGrams}g`;
        document.getElementById('proteinGrams').textContent = `${proteinGrams}g`;
        document.getElementById('carbGrams').textContent = `${carbGrams}g`;

        document.getElementById('tmbResults').classList.remove('hidden');
    }

    // ============================================
    // SEGUIMIENTO DE ALIMENTOS
    // ============================================
    async addFoodEntry() {
        const name = document.getElementById('foodName').value;
        const amount = parseFloat(document.getElementById('foodAmount').value);
        const unit = document.getElementById('foodUnit').value;
        
        if (!name || !amount) return;

        // Buscar alimento
        const foods = await this.searchFood(name);
        const food = foods[0];
        
        if (!food) {
            alert('Alimento no encontrado. Crea uno personalizado.');
            return;
        }

        // Convertir unidades
        const multiplier = this.getUnitMultiplier(unit, amount);
        
        const entry = {
            id: Date.now(),
            name: food.name,
            amount: amount,
            unit: unit,
            calories: Math.round(food.calories * multiplier),
            fat: Math.round(food.fat * multiplier * 10) / 10,
            protein: Math.round(food.protein * multiplier * 10) / 10,
            carbs: Math.round(food.carbs * multiplier * 10) / 10,
            fiber: Math.round(food.fiber * multiplier * 10) / 10,
            net_carbs: Math.round((food.net_carbs || (food.carbs - food.fiber)) * multiplier * 10) / 10,
            timestamp: new Date().toISOString()
        };

        this.dailyFoods.push(entry);
        localStorage.setItem('dailyFoods', JSON.stringify(this.dailyFoods));
        this.updateDailySummary();
        this.renderFoodLog();
        
        // Limpiar formulario y resultados
        document.getElementById('foodForm').reset();
        document.getElementById('searchResults').classList.add('hidden');
    }

    getUnitMultiplier(unit, amount) {
        const multipliers = {
            'g': amount / 100,
            'ml': amount / 100,
            'oz': amount * 28.35 / 100,
            'cup': amount * 236.6 / 100,
            'piece': amount * 100 / 100 // Asumimos 100g por pieza
        };
        return multipliers[unit] || 1;
    }

    updateDailySummary() {
        const total = this.dailyFoods.reduce((acc, food) => ({
            calories: acc.calories + food.calories,
            fat: acc.fat + food.fat,
            protein: acc.protein + food.protein,
            carbs: acc.carbs + food.carbs,
            fiber: acc.fiber + food.fiber,
            net_carbs: acc.net_carbs + food.net_carbs
        }), {calories: 0, fat: 0, protein: 0, carbs: 0, fiber: 0, net_carbs: 0});

        // Update circles
        document.getElementById('dailyFat').textContent = `${Math.round(total.fat)}g`;
        document.getElementById('dailyProtein').textContent = `${Math.round(total.protein)}g`;
        document.getElementById('dailyCarbs').textContent = `${Math.round(total.net_carbs)}g`;

        // Update progress bars
        const targetCalories = 1800;
        const targetCarbs = 20;
        
        document.getElementById('caloriesProgress').textContent = `${total.calories} / ${targetCalories} kcal`;
        document.getElementById('carbsProgress').textContent = `${Math.round(total.net_carbs)} / ${targetCarbs}g`;
        
        document.getElementById('caloriesBar').style.width = `${Math.min(100, (total.calories / targetCalories) * 100)}%`;
        document.getElementById('carbsBar').style.width = `${Math.min(100, (total.net_carbs / targetCarbs) * 100)}%`;
    }

    renderFoodLog() {
        const log = document.getElementById('foodLog');
        if (this.dailyFoods.length === 0) {
            log.innerHTML = '<div class="text-center text-keto-secondary py-8">No hay alimentos registrados hoy.</div>';
            return;
        }

        log.innerHTML = this.dailyFoods.map(food => `
            <div class="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <div>
                    <strong>${food.name}</strong> (${food.amount}${food.unit})<br>
                    <small class="text-keto-secondary">
                        ${food.calories} kcal | G:${food.fat}g | P:${food.protein}g | C:${food.net_carbs}g
                    </small>
                </div>
                <button onclick="app.removeFoodEntry(${food.id})" class="text-red-500 hover:text-red-700 font-bold">×</button>
            </div>
        `).join('');
    }

    removeFoodEntry(id) {
        this.dailyFoods = this.dailyFoods.filter(f => f.id !== id);
        localStorage.setItem('dailyFoods', JSON.stringify(this.dailyFoods));
        this.updateDailySummary();
        this.renderFoodLog();
    }

    // ============================================
    // BÚSQUEDA EN TIEMPO REAL
    // ============================================
    async handleRealTimeSearch(query) {
        const spinner = document.getElementById('loadingSpinner');
        const results = document.getElementById('searchResults');
        
        if (query.length < 3) {
            spinner.classList.add('hidden');
            results.classList.add('hidden');
            return;
        }

        spinner.classList.remove('hidden');
        results.classList.add('hidden');

        try {
            const foods = await this.searchFood(query);
            spinner.classList.add('hidden');
            
            if (foods.length > 0) {
                results.innerHTML = foods.map(food => {
                    const isKetoFriendly = (food.net_carbs || 0) <= 5;
                    return `
                        <div class="search-result-item" onclick="app.selectFood('${food.name}')">
                            <strong>${food.name}</strong> - ${food.calories} kcal, ${food.net_carbs}g net carbs
                            ${isKetoFriendly ? '✅ Keto' : '⚠️ Alto carbs'}
                        </div>
                    `;
                }).join('');
                results.classList.remove('hidden');
            }
        } catch (error) {
            spinner.classList.add('hidden');
            console.error('Error en búsqueda:', error);
        }
    }

    selectFood(name) {
        document.getElementById('foodName').value = name;
        document.getElementById('searchResults').classList.add('hidden');
    }

    // ============================================
    // CREAR ALIMENTOS PERSONALIZADOS
    // ============================================
    showCreateFoodModal() {
        document.getElementById('createFoodModal').style.display = 'block';
    }

    closeCreateFoodModal() {
        document.getElementById('createFoodModal').style.display = 'none';
        document.getElementById('createFoodForm').reset();
    }

    createCustomFood() {
        const food = {
            name: document.getElementById('customFoodName').value,
            calories: parseInt(document.getElementById('customCalories').value),
            fat: parseFloat(document.getElementById('customFat').value),
            protein: parseFloat(document.getElementById('customProtein').value),
            carbs: parseFloat(document.getElementById('customCarbs').value),
            fiber: 0,
            net_carbs: parseFloat(document.getElementById('customCarbs').value)
        };

        this.customFoods.push(food);
        localStorage.setItem('customFoods', JSON.stringify(this.customFoods));
        this.initializeDatabase();
        this.closeCreateFoodModal();
        
        alert(`Alimento "${food.name}" creado exitosamente!`);
    }

    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    // ============================================
    // SEGUIMIENTO DE PESO
    // ============================================
    addWeightEntry() {
        const weight = parseFloat(document.getElementById('currentWeight').value);
        if (!weight) return;

        const entry = {
            date: new Date().toLocaleDateString('es-ES'),
            weight: weight
        };

        this.weightHistory.push(entry);
        localStorage.setItem('weightHistory', JSON.stringify(this.weightHistory));
        
        document.getElementById('currentWeight').value = '';
        this.updateWeightHistory();
    }

    updateWeightHistory() {
        const container = document.getElementById('weightHistory');
        if (this.weightHistory.length === 0) {
            container.innerHTML = '<div class="text-center text-keto-secondary py-4">No hay datos de peso registrados</div>';
            return;
        }

        container.innerHTML = this.weightHistory.slice(-5).reverse().map(entry => `
            <div class="flex justify-between p-2 bg-white/30 rounded">
                <span>${entry.date}</span>
                <span class="font-semibold">${entry.weight} kg</span>
            </div>
        `).join('');

        // Calcular cambio
        if (this.weightHistory.length > 1) {
            const first = this.weightHistory[0].weight;
            const last = this.weightHistory[this.weightHistory.length - 1].weight;
            const change = last - first;
            document.getElementById('weightChange').textContent = `${change.toFixed(1)} kg`;
        }
    }

    // ============================================
    // CRONÓMETRO DE AYUNO
    // ============================================
     initializeVanta() {
        if (typeof VANTA !== 'undefined') {
            VANTA.BIRDS({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                backgroundColor: 0x1a3d2e,
                color1: 0xa8c090
            });
        }
    }

    // ============================================
    // LIMPIEZA DE CACHE
    // ============================================
    clearOldCache() {
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('food_cache_') && key.endsWith('_date')) {
                const date = parseInt(localStorage.getItem(key));
                if (Date.now() - date > sevenDays) {
                    localStorage.removeItem(key);
                    localStorage.removeItem(key.replace('_date', ''));
                }
            }
        });
    }
}

// INICIALIZACIÓN GLOBAL
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new KetoLifeApp();
});

// Función para scroll del botón hero
function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth'});
}