// JavaScript portofolio Andi Pratama
// Dipasang di ketiga halaman dengan defer
// 2. Tema gelap (semua halaman)
// Mengambil tema yang tersimpan
const tombolTema = document.querySelector("#tombol-tema");
const temaTersimpan = localStorage.getItem("tema");

if (tombolTema) {
    if (temaTersimpan === "gelap") {
        document.body.classList.add("gelap");
        tombolTema.textContent = "Mode Terang";
        tombolTema.setAttribute("aria-label", "Aktifkan mode terang");
        tombolTema.setAttribute("aria-pressed", "true");
    } else {
        tombolTema.setAttribute("aria-pressed", "false");
    }

    tombolTema.addEventListener("click", () => {
        document.body.classList.toggle("gelap");
        const gelapAktif = document.body.classList.contains("gelap");
        tombolTema.textContent = gelapAktif ? "Mode Terang" : "Mode Gelap";
        tombolTema.setAttribute("aria-label", gelapAktif ? "Aktifkan mode terang" : "Aktifkan mode gelap");
        tombolTema.setAttribute("aria-pressed", String(gelapAktif));

        localStorage.setItem("tema", gelapAktif ? "gelap" : "terang");
    });
}

// 3. Penghitung karakter pesan (halaman Kontak)
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");
if (kotakPesan) {
    kotakPesan.addEventListener("input", () => {
        hitungKarakter.textContent = `${kotakPesan.value.length}/300
karakter`;
    });
}


// 4. Daftar proyek dan filter (halaman Proyek)
let proyek = [];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item, urutan) {
    const muat = urutan < 2
        ? 'fetchpriority="high"'
        : 'loading="lazy"';

    return `
    <article class="kartu">
        <span class="label">${item.kategori}</span>
        <h3>${item.judul}</h3>
        <img src="${item.gambar}" alt="${item.alt}" width="840" height="594" ${muat} decoding="async">
        <p>${item.deskripsi}</p>
    </article>`;
}

function tampilkanProyek(daftar) {
    const semuaKartu = daftar.map((item, i) => buatKartu(item, i));
    daftarProyek.innerHTML = semuaKartu.join("");
    jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}

// Mengambil data proyek dari file JSON
async function muatProyek() {
    jumlahProyek.textContent = "Memuat proyek...";

    try {
        const response = await fetch("data/proyek.json");

        if (!response.ok) {
            throw new Error(`Status ${response.status}`);
        }

        proyek = await response.json();
        tampilkanProyek(proyek);

    } catch (error) {
        jumlahProyek.textContent = "Data proyek gagal dimuat.";
        console.error(error);
    }
}

function pasangFilter(idTombol, kategori) {
    const tombol = document.querySelector(idTombol);

    tombol.addEventListener("click", () => {
        document.querySelectorAll(".tombol-filter").forEach((item) => {
            item.setAttribute("aria-pressed", "false");
        });
        tombol.setAttribute("aria-pressed", "true");

        if (kategori === "Semua") {
            tampilkanProyek(proyek);
        } else {
            tampilkanProyek(proyek.filter((item) => item.kategori === kategori));
        }
    });
}

if (daftarProyek) {
    muatProyek();
    pasangFilter("#filter-semua", "Semua");
    pasangFilter("#filter-html", "HTML");
    pasangFilter("#filter-css", "CSS");
    pasangFilter("#filter-javascript", "JavaScript");
}
// 5. Repositori GitHub terbaru (halaman Proyek)
const username = "sucirpl1-commits";
const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?sort=updated&per_page=6";
const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");
if (daftarRepo) {
    async function ambilRepo() {
        try {
            const response = await fetch(alamatRepo + pilihan);
            if (!response.ok) {
                throw new Error(`GitHub mengembalikan status ${response.status}`);
            }

            const repos = await response.json();
            repos.forEach((repo) => {
                const item = document.createElement("li");
                const tautan = document.createElement("a");
                tautan.href = repo.html_url;
                tautan.target = "_blank";
                tautan.rel = "noopener noreferrer";
                tautan.textContent = repo.name;
                item.appendChild(tautan);
                daftarRepo.appendChild(item);
            });
            statusRepo.textContent = `${repos.length} repositori yang terakhir diperbarui:`;
        } catch (error) {
            statusRepo.textContent =  "Maaf, daftar repository tidak dapat dimuat. Periksa koneksi atau nama akun GitHub.";
            console.error("Gagal memuat repositori GitHub:", error);
        }
    }

    ambilRepo();
}
// 1. Daftar keahlian (halaman Beranda), data daridata / keahlian.json
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");
async function muatKeahlian() {
    try {
        const response = await fetch("data/keahlian.json");
        if (!response.ok) {
            throw new Error(`Status ${response.status}`);
        }
        const skills = await response.json();
        skills.forEach((skill) => {
            const item = document.createElement("li");
            item.textContent = `${skill.nama} (${skill.level})`;
            daftarSkill.appendChild(item);
        });
        jumlahSkill.textContent = `Ada ${skills.length} keahlian yang
sedang saya kembangkan.`;
    } catch (error) {
        jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
        console.error(error);
    }
}
if (daftarSkill) {
    muatKeahlian();
}
// Form keahlian baru
const formSkill = document.querySelector("#form-skill");
if (formSkill) {
    formSkill.addEventListener("submit", (event) => {
        event.preventDefault();

        const inputSkill = formSkill.querySelector("#tombol-skill");
        const inputLevel = formSkill.querySelector("#tombol-level");
        const namaSkill = inputSkill.value.trim();
        const levelSkill = inputLevel.value;

        if (!namaSkill || !levelSkill) return;

        const item = document.createElement("li");
        item.textContent = `${namaSkill} (${levelSkill})`;
        daftarSkill.appendChild(item);

        const jumlahSaatIni = daftarSkill.querySelectorAll("li").length;
        jumlahSkill.textContent = `Ada ${jumlahSaatIni} keahlian yang sedang saya kembangkan.`;

        formSkill.reset();
        inputSkill.focus();
    });
}

// Form kontak
const formKontak = document.querySelector("#form-kontak");
if (formKontak) {
    formKontak.addEventListener("submit", (event) => {
        event.preventDefault();

        const keperluan = formKontak.querySelector("#keperluan").value;
        if (!keperluan) {
            alert("Silakan pilih keperluan terlebih dahulu.");
            return;
        }

        alert("Pesan berhasil dikirim. Terima kasih!");
        formKontak.reset();
        hitungKarakter.textContent = "0/300 karakter";
    });
}