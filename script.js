// Expanded Legal Database
const legalData = [
    {
        id: "Art 14",
        title: "Article 14 - Samanata Ka Adhikar (Right to Equality)",
        category: "samvidhan",
        description: "Bharat ke rajyakshetra mein kanoon ke samaksh sabhi vyakti saman hain aur kanoon ka saman sanrakshan prapt hai."
    },
    {
        id: "Art 19",
        title: "Article 19 - Freedom of Speech & Expression",
        category: "samvidhan",
        description: "Sabhi nagrikon ko bolne ki swatantrata, shantipurvak bina hathiyar ke ikattha hone, sangh banane, aur poore desh mein ghumne ki azaadi hai."
    },
    {
        id: "Art 21",
        title: "Article 21 - Right to Life & Personal Liberty",
        category: "samvidhan",
        description: "Kisi bhi vyakti ko uske jeevan ya vyaktigat swatantrata se kanoon dwara sthapit prakriya ke alawa vanchit nahi kiya jayega."
    },
    {
        id: "Art 32",
        title: "Article 32 - Constitutional Remedies",
        category: "samvidhan",
        description: "Fundamental Rights ko laagu karane ke liye Supreme Court mein seedhe jaane ka adhikar (Dr. Ambedkar ne ise Samvidhan ki atma kaha hai)."
    },
    {
        id: "BNS 103",
        title: "BNS Section 103 - Murder (Hatya Ki Saza)",
        category: "criminal",
        description: "Hatya karne par maut ki saza (Death Penalty) ya a आजीवन karawas (Life Imprisonment) aur jurmana ho sakta hai."
    },
    {
        id: "BNS 318",
        title: "BNS Section 318 - Cheating (Dhokhabhadi)",
        category: "criminal",
        description: "Kisi ke saath dhokha karke uski property ya paise lene par 3 se 7 saal tak ki saza aur jurmana ho sakta hai."
    },
    {
        id: "BNS 351",
        title: "BNS Section 351 - Criminal Intimidation (Dhamki Dena)",
        category: "criminal",
        description: "Kisi vyakti ko ya uske parivar ko jaan-maal ki dhamki dene par 2 saal tak ki saza ya jurmana ho sakta hai."
    },
    {
        id: "Guide 1",
        title: "FIR Kaise Darj Karayein? (Process)",
        category: "procedure",
        description: "Step 1: Apne paas ke Police Station jayein.\nStep 2: Ghatna ki jankari likhit ya oral dein.\nStep 3: Section 173 BNSS ke tehat FIR ki free copy zaroor maangein."
    },
    {
        id: "Guide 2",
        title: "RTI Application Kaise Likhein?",
        category: "procedure",
        description: "Sarkari vibhag se jankari lene ke liye RTI Act 2005 ke tehat ₹10 ki fee ke saath written application Public Information Officer (PIO) ko dein."
    }
];

let currentCategory = 'all';

// Data ko Screen par display karne ka function
function displayData(data) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: gray; padding: 20px;">Koi kanoon ya article nahi mila.</p>';
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <span class="badge">${item.id}</span>
            <h3>${item.title}</h3>
            <p>${item.description.substring(0, 90)}...</p>
        `;
        
        // Card par click karne par Modal khulega
        card.onclick = () => openModal(item);
        
        container.appendChild(card);
    });
}

// Search Function
function searchLaw() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    const filteredData = legalData.filter(item => {
        const matchesCategory = (currentCategory === 'all' || item.category === currentCategory);
        const matchesQuery = item.title.toLowerCase().includes(query) || 
                             item.description.toLowerCase().includes(query) ||
                             item.id.toLowerCase().includes(query);
        return matchesCategory && matchesQuery;
    });

    displayData(filteredData);
}

// Category Filter Function
function filterCategory(category) {
    currentCategory = category;
    
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    searchLaw();
}

// Open Modal Function
function openModal(item) {
    document.getElementById('modalBadge').innerText = item.id;
    document.getElementById('modalTitle').innerText = item.title;
    document.getElementById('modalDesc').innerText = item.description;
    document.getElementById('lawModal').style.display = 'flex';
}

// Close Modal Function
function closeModal() {
    document.getElementById('lawModal').style.display = 'none';
}

// Window click par modal band karne ke liye
window.onclick = function(event) {
    const modal = document.getElementById('lawModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Initial Load
displayData(legalData);