class Car {
    constructor(make, model, year, color, mileage, isRunning) {
      this.make = make;
      this.model = model;
      this.year = year;
      this.color = color;
      this.mileage = mileage;
      this.isRunning = isRunning;
    }
  
    start() {
      if (this.isRunning) {
        console.log(`The ${this.make} ${this.model} is already running.`);
      } else {
        this.isRunning = true;
        console.log(`Starting the ${this.make} ${this.model}...`);
      }
    }
  
    stop() {
      if (this.isRunning) {
        this.isRunning = false;
        console.log(`Stopping the ${this.make} ${this.model}...`);
      } else {
        console.log(`The ${this.make} ${this.model} is already stopped.`);
      }
    }
  
    drive(distance) {
      if (this.isRunning) {
        this.mileage += distance;
        console.log(`Driving the ${this.make} ${this.model} for ${distance} miles...`);
        console.log(`Current mileage: ${this.mileage}`);
      } else {
        console.log(`The ${this.make} ${this.model} needs to be started before you can drive it.`);
      }
    }
  
    paint(newColor) {
      console.log(`Painting the ${this.make} ${this.model} ${newColor}...`);
      this.color = newColor;
    }
  
    getMileage() {
      console.log(`Current mileage: ${this.mileage}`);
      return this.mileage;
    }
  
    getColor() {
      console.log(`Current color: ${this.color}`);
      return this.color;
    }
  }
  
  const myCar = new Car("Toyota", "Camry", 2019, "blue", 10000, false);
