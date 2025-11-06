const API_URL = "/naloge";

// UCITAVANJW I BRANJW NALOGA
async function naloziNaloge() {
    const res = await fetch(API_URL);
    const naloge = await res.json();
    const seznam = document.getElementById("seznam");
    seznam.innerHTML = "";

    naloge.forEach(n => {
        const div = document.createElement("div");
        div.className = n.opravljeno ? "task done" : "task";


        div.innerHTML = `
  <div class="task-header">
    <strong>${n.ime}</strong>
    <small><b>Rok:</b> ${n.rok ? n.rok : "Ni določen"} |
    <b>Pomembno:</b> ${n.pomembno ? "DA" : "NE"}</small>
  </div>

  <p class="opis">${n.opis || ""}</p>

  <label class="task-status">
    <input type="checkbox" onchange="oznaciOpravljeno(${n.nalogaID}, this.checked)" ${n.opravljeno ? "checked" : ""}>
    <span>Opravljeno</span>
  </label>

  <button class="delete-btn" onclick="izbrisiNalogo(${n.nalogaID})">Izbriši</button>
  <button class="edit-btn" onclick="urediNalogo(${n.nalogaID})">Izmenjaj</button>

    `;
        seznam.appendChild(div);
    });
}
//filtriranje naloga --- dodatna funkcija
async function filtrirajNaloge() {
    const option = document.getElementById("filterOption").value;
    let url = API_URL;

    if (option) {
        url = `${API_URL}/filter?${option}`;
    }

    const res = await fetch(url);
    const naloge = await res.json();
    const seznam = document.getElementById("seznam");
    seznam.innerHTML = "";

    naloge.forEach(n => {
        const div = document.createElement("div");
        div.className = "task";

        div.innerHTML = `
            <div class="task-header">
                <strong>${n.ime}</strong>
                <small><b>Rok:</b> ${n.rok ? n.rok : "Ni določen"} |
                <b>Pomembno:</b> ${n.pomembno ? "DA" : "NE"}</small>
            </div>
            <p>${n.opis || ""}</p>
            <label>
                <input type="checkbox" onchange="oznaciOpravljeno(${n.nalogaID}, this.checked)" ${n.opravljeno ? "checked" : ""}>
                Opravljeno
            </label>
            <button onclick="izbrisiNalogo(${n.nalogaID})">Izbriši</button>
        `;
        seznam.appendChild(div);
    });
}


// DODAVANJE NOVE NAKOGE
async function dodajNalogo() {
    const ime = document.getElementById("ime").value;
    const opis = document.getElementById("opis").value;
    const rok = document.getElementById("rok").value;
    const pomembno = document.getElementById("pomembno").checked;

    if (!ime) {
        alert("Ime naloge je obvezno!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ime,
            opis,
            opravljeno: false,
            rok,
            pomembno
        })
    });

    setTimeout(() => naloziNaloge(), 300);

    document.getElementById("ime").value = "";
    document.getElementById("opis").value = "";
    document.getElementById("rok").value = "";
    document.getElementById("pomembno").checked = false;
}

function izbrisiNalogo(id) {
    if (confirm("Ali ste prepričani, da želite izbrisati to nalogo?")) {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Napaka pri brisanju naloge");
                }
                // Nakon uspešnog brisanja, osveži seznam
                naloziNaloge();
            })
            .catch(error => {
                console.error("Napaka:", error);
                alert("Prišlo je do napake pri brisanju naloge.");
            });
    }
}


// oPRAVLJENO
async function oznaciOpravljeno(id, checked) {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opravljeno: checked })
    });
    naloziNaloge();
}

async function oznaciOpravljeno(id, checked) {
    await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opravljeno: checked })
    });

    // Dodaj mali delay pre ponovnog učitavanja
    setTimeout(() => naloziNaloge(), 300);
}


async function urediNalogo(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        const naloga = await res.json();

        // Popuni formu postojećim podacima
        document.getElementById("ime").value = naloga.ime;
        document.getElementById("opis").value = naloga.opis;
        document.getElementById("rok").value = naloga.rok ? naloga.rok.split("T")[0] : "";
        document.getElementById("pomembno").checked = naloga.pomembno;

        // Privremeno zapamti koji ID se uređuje
        window.trenutnaNalogaID = id;

        // Promeni dugme "Dodaj nalogo" u "Shrani spremembe"
        const dugme = document.querySelector(".form button");
        dugme.textContent = "Shrani spremembe";
        dugme.onclick = shraniSpremembe;
    } catch (err) {
        console.error("Napaka pri branju naloge:", err);
    }
}


async function shraniSpremembe() {
    const ime = document.getElementById("ime").value;
    const opis = document.getElementById("opis").value;
    const rok = document.getElementById("rok").value;
    const pomembno = document.getElementById("pomembno").checked;

    if (!window.trenutnaNalogaID) return alert("Ni izbrane naloge za urejanje!");

    await fetch(`${API_URL}/${window.trenutnaNalogaID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ime,
            opis,
            opravljeno: false,
            rok,
            pomembno
        })
    });

    // Reset forme i dugmeta
    document.getElementById("ime").value = "";
    document.getElementById("opis").value = "";
    document.getElementById("rok").value = "";
    document.getElementById("pomembno").checked = false;

    const dugme = document.querySelector(".form button");
    dugme.textContent = "Dodaj nalogo";
    dugme.onclick = dodajNalogo;

    window.trenutnaNalogaID = null;

    naloziNaloge();
}


naloziNaloge();