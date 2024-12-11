// MEMBERSHIP LEVELS CARDS -- LET'S BUILD THEM!
const memberLevels = [
    {
        'title': 'Gold',
        'price': '$500',
        'benefits': 'Free Table at all events. Exclusive Access to Quarterly Gold Members Only Networking Events. Home Page Spotlight. Logo Added to all Chamber Marketing. Discounted Annual Conference Admission.',
        'target': 'Premium Membership for Maximum Exposure.'
    },
    {
        'title': 'Silver',
        'price': '$250',
        'benefits': 'Free Table at all events. Home Page Spotlight. Logo Added to all Chamber Marketing. Discounted Annual Conference Admission.',
        'target': 'Enhanced Membership With Increased Networking Opportunities'
    },
    {
        'title': 'Bronze',
        'price': '$100',
        'benefits': 'Logo Added to all Chamber Marketing. Discounted Annual Conference Admission.',
        'target': 'The Right Choice for Any Business Starting Out.'
    },
    {
        'title': 'Non-Profit',
        'price': 'FREE',
        'benefits': 'Discounted Annual Conference Admission.',
        'target': 'Ideal for Smaller Non-Profit Organizations.'
    }

]


// Build the levels grid
const displayMembershipLevelCards = (members) => {

    // Reset the grid
    const grid = document.querySelector('#member-levels-grid');
    grid.innerHTML = '';

    // Parse through each 4
    members.forEach((member) => {

        // BUILD THE CARDS
        let card = document.createElement('section');
        card.classList.add('membership-card');
        card.classList.add(member.title);

        // Separate into 2 sections, top and bottom
        let title = document.createElement('h2');
        title.textContent = `${member.title} Membership Level`;

        let learnButton = document.createElement('button');
        learnButton.textContent = 'Learn More';
        learnButton.classList.add('learn-button');

        // Adding event listener for modal
        learnButton.addEventListener('click', () => {
            displayMemberDetailsModal(member);
            // Placeholder for your modal logic
        });

        // Add gradient coloring

        // Now, pin the whole grid.
        card.appendChild(title);
        card.appendChild(learnButton);

        // Now, add the card to the grid
        grid.appendChild(card);
    });
}

// MODAL LOGIC

const memberDetails = document.querySelector('#member-details');

function displayMemberDetailsModal(member) {
    // Reset when displaying
    memberDetails.innerHTML = '';
    memberDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${member.title} Membership</h2>
        <h3>${member.target}</h3>
        <div id=modal-wrapper>
            <div id='modal-left'
                <p><strong>Annual Fee:</strong></p>
                <p><strong>Benfits:</strong></p>
            </div>
            <div id='modal-right'
                <p> ${member.price}</p>
                <p> ${member.benefits}</p>
            </div>
        </div>
    `;

    memberDetails.showModal();

    const closeButton = document.querySelector('#closeModal');

    closeButton.addEventListener("click", () => {
        memberDetails.close();
    });
}

displayMembershipLevelCards(memberLevels);