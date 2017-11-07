class MangoTree {
  constructor(age, height, fruits, healthy) {
    this.age = age;
    this.height = height;
    this.fruits = fruits;
    this.healthy = healthy;
    this.harvested = [];   // fruits
    this.good = 0;
    this.bad = 0;
  }
  getAge () {
    return this.age;
  }
  getHeight () {
    return this.height;
  }
  getFruits () {
    return this.fruits;
  }
  gethealthy () {
    return this.healthy;
  }
  grow () {
    this.age++;
    var disease = Math.floor(Math.random() * 100)
    console.log(disease)
    if (this.age >= 300 || disease == 33) {
      this.healthy = 'dead';
    }
    if (disease == 33) {
      this.healthy = 'disease';
    }
    if(this.height <= 30){
      this.height += Math.floor(Math.random() * 3);
    }
  }
  produceMangoes () {
    if(this.age >= 1){
      for(let i=0; i < Math.floor(Math.random() * 50); i++){
        this.harvested.push(new Mango());
      }
    }
  }
  harvest () {
    this.good = 0;
    this.bad = 0;
    for(let i=0; i<this.harvested.length; i++){
      if(this.harvested[i].quality == 'bad'){
        this.bad++;
      } else {
        this.good++;
      }
    }
    this.fruits = this.harvested.length;
    this.harvested = [];
  }
}

class Mango {
  constructor() {
    this.quality = this.randomQuality();
  }
  //methods
  randomQuality(){
    let condition = Math.floor(Math.random() * 2)
    if (condition == 0) {
      return 'good'
    }
    else {
      return 'bad';
    }
  }
}

module.exports = {
  MangoTree,
  Mango
}
