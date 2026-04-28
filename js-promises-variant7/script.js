console.log("🚀 Старт програми");

// 20% шанс помилки
function randomFail() {
    return Math.random() < 0.2;
}

// 1. Валідація корзини
function validateCart(items) {
    return new Promise((resolve, reject) => {
        console.log("🔍 Перевірка корзини...");

        setTimeout(() => {
            if (!items || items.length === 0) {
                return reject("❌ Корзина пуста");
            }

            if (randomFail()) {
                return reject("❌ Помилка при валідації");
            }

            console.log("✅ Корзина валідна");
            resolve(items);
        }, 1000);
    });
}

// 2. Підрахунок суми
function calculateSubtotal(items) {
    return new Promise((resolve, reject) => {
        console.log("💰 Розрахунок суми...");

        setTimeout(() => {
            if (randomFail()) {
                return reject("❌ Помилка підрахунку");
            }

            const subtotal = items.reduce((sum, item) => sum + item.price, 0);

            console.log("✅ Сума:", subtotal);
            resolve({ items, subtotal });
        }, 500);
    });
}

// 3. Знижка
function applyDiscount(data, code) {
    return new Promise((resolve, reject) => {
        console.log("🏷 Застосування знижки...");

        setTimeout(() => {
            if (randomFail()) {
                return reject("❌ Помилка знижки");
            }

            let discount = 0;

            if (code === "SALE10") {
                discount = data.subtotal * 0.1;
            }

            const total = data.subtotal - discount;

            console.log("✅ Після знижки:", total);
            resolve({ ...data, total });
        }, 1000);
    });
}

// 4. Податок
function calculateTax(data) {
    return new Promise((resolve, reject) => {
        console.log("🧾 Розрахунок податку...");

        setTimeout(() => {
            if (randomFail()) {
                return reject("❌ Помилка податку");
            }

            const tax = data.total * 0.2;
            const finalTotal = data.total + tax;

            console.log("✅ З податком:", finalTotal);
            resolve({ ...data, finalTotal });
        }, 500);
    });
}

// 5. Оформлення замовлення
function finalizeOrder(data) {
    return new Promise((resolve, reject) => {
        console.log("📦 Оформлення замовлення...");

        setTimeout(() => {
            if (randomFail()) {
                return reject("❌ Помилка оформлення");
            }

            resolve(`🎉 Замовлення оформлено! Сума: ${data.finalTotal.toFixed(2)} грн`);
        }, 1500);
    });
}

// Тестові дані
const cart = [
    { name: "Ноутбук", price: 20000 },
    { name: "Мишка", price: 500 },
    { name: "Клавіатура", price: 1500 }
];

// Ланцюжок Promise
validateCart(cart)
    .then(items => calculateSubtotal(items))
    .then(data => applyDiscount(data, "SALE10"))
    .then(data => calculateTax(data))
    .then(data => finalizeOrder(data))
    .then(result => console.log(result))
    .catch(error => console.error("🚨 ПОМИЛКА:", error))
    .finally(() => console.log("🔚 Процес завершено"));