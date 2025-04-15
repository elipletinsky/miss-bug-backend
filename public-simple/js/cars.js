async function onGetCars() {
    const elData = document.querySelector('pre')
    const res = await fetch('/api/car')
    const cars = await res.json()
    elData.innerText = JSON.stringify(cars, null, 4)
}