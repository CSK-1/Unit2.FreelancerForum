// A visitor enters the website and finds a list of available freelancers. Each freelancer has a name, an occupation, and a starting price for their services. They observe on the list Alice, the writer with a starting price of $30, and Bob, who is a teacher, has a starting price of $50.

// The visitor also finds a message that displays the average starting price of all the freelancers. In this example, the average starting price is $40.

// A few seconds later, a new listing appears for a freelancer named Carol, who is a programmer and has a starting price of $70. The average starting price is updated to $50.

// New freelancers continue to appear every few seconds, and the average starting price is updated accordingly.

const names = ["Frank", "Sarah", "Anastasia", "Carmen", "Betty", "Phil", "Barbara", "Bill", "Dave"];
const prices = [70, 35, 80, 90, 65, 45, 60, 75, 55, 40];
const occupations = ["Teacher", "Physical Therapist", "Product Manager", "Quality Assurance", "Intern", "Programmer", "Assistant"]
const maxFreelancers = 20;

const freelancers = [
	{
		name: "Alice",
		price: 30,
		occupation: "Writer",
	},
	{
		name: "Bob",
		price: 50,
		occupation: "Teacher",
	},
];

const carol = {name: "Carol", price: 70, occupation: "Programmer"}

function init() {
	const root = document.querySelector("#root");
	const h1 = document.createElement("h1");
	h1.innerHTML = "Freelancer Forum";
	root.append(h1);
	const h2 = document.createElement("h2");
	h2.innerHTML = "Available Freelancers";
	root.append(h2);
	const freelancerContainer = document.createElement("div");
	freelancerContainer.id = "freelancerContainer";
	freelancerContainer.classList.add("freelancers");
	root.append(freelancerContainer);

	renderFreelancers();
};

function renderFreelancers() {
	const container = document.querySelector("#freelancerContainer");
    let average = 40;
	container.innerHTML = `The average starting price is: $<span id=average>${average}</span>
                            <div id=freelancers>
                                <section id=name class=freelancerContent><h3>Name</h3></section>
                                <section id=occupation class=freelancerContent><h3>Occupation</h3></section>
                                <section id=price class=freelancerContent><h3>Price</h3></section>
                            </div>`;
    const nameContainer = document.querySelector("#name");
    const priceContainer = document.querySelector("#price");
    const occupationContainer = document.querySelector("#occupation");
    const averageContainer = document.querySelector("#average")
	freelancers.forEach((freelancer) => {
        let nameDiv = document.createElement("div");
        nameDiv.append(freelancer.name);
		nameContainer.append(nameDiv);

        let priceDiv = document.createElement("div");
        priceDiv.append(freelancer.price);
        priceContainer.append(priceDiv);

        let occupationDiv = document.createElement("div");
        occupationDiv.append(freelancer.occupation);
        occupationContainer.append(occupationDiv);

        average = getAverage();
        averageContainer.replaceWith(`${average.toFixed(2)}`);
	});
};

function getAverage() {
    let totalPrice = 0;
    freelancers.map((freelancer) => totalPrice += freelancer.price);
    return totalPrice / freelancers.length;
}

const addFreelancer = () => {
    const found = freelancers.find((freelancer) => freelancer.name === carol.name);
    if (!found) {
        freelancers.push(carol);
    } else {
        const name = names[Math.floor(Math.random() * names.length)];
        const price = prices[Math.floor(Math.random() * prices.length)];
        const occupation = occupations[Math.floor(Math.random() * occupations.length)];
        freelancers.push({ name, price, occupation });
    };
  };

const addFreelancerIntervalId = setInterval(() => {
    addFreelancer();
    renderFreelancers();
    if(freelancers.length >= maxFreelancers){
      clearInterval(addFreelancerIntervalId)
    }
  }, 3000);

init();
