
function createCandyElement(candy) {
    const li = document.createElement('li');
    li.innerText = `${candy.candyName} - ${candy.description} - Price: $${candy.price} - Quantity: ${candy.quantity}`;

    const buyButton = document.createElement('button');
    buyButton.innerText = 'Buy';
    buyButton.addEventListener('click', function() {
        buyCandy(candy._id, 1); 
    });

    li.appendChild(buyButton);
    return li;
}


function buyCandy(candyId, quantity) {
   
    axios.patch(`https://crudcrud.com/api/2c135ada6de0422dbaf1ef627323a3a6/candies/${candyId}`, { quantity: quantity })
        .then(function(response) {
         
            const updatedCandy = response.data;
            const candyElement = document.getElementById(`candy-${updatedCandy._id}`);
            candyElement.innerText = `${updatedCandy.candyName} - ${updatedCandy.description} - Price: $${updatedCandy.price} - Quantity: ${updatedCandy.quantity}`;
        })
        .catch(function(error) {
            console.log(error);
        });
}

axios.get('https://crudcrud.com/api/2c135ada6de0422dbaf1ef627323a3a6/candies')
    .then(function(response) {
      
        const candies = response.data;
        const ul = document.getElementById('ul-list');
        
        candies.forEach(function(candy) {
            const candyElement = createCandyElement(candy);
            candyElement.id = `candy-${candy._id}`;
            ul.appendChild(candyElement);
        });
    })
    .catch(function(error) {
        console.log(error);
    });

document.getElementById('addIem').addEventListener('click', function(event) {
    event.preventDefault();

    const candyName = document.getElementById('candy').value;
    const description = document.getElementById('Description').value;
    const price = document.getElementById('Price').value;
    const quantity = document.getElementById('Quantity').value;

    const newCandy = {
        candyName: candyName,
        description: description,
        price: price,
        quantity: quantity
    };

  
    axios.post('https://crudcrud.com/api/2c135ada6de0422dbaf1ef627323a3a6/candies', newCandy)
        .then(function(response) {
        
            console.log(response.data);

            document.getElementById('candy').value = '';
            document.getElementById('Description').value = '';
            document.getElementById('Price').value = '';
            document.getElementById('Quantity').value = '';

        
            const ul = document.getElementById('ul-list');
            const candyElement = createCandyElement(response.data);
            candyElement.id = `candy-${response.data._id}`;
            ul.appendChild(candyElement);
        })
        .catch(function(error) {
            console.log(error);
        });
});


