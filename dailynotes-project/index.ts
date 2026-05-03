const FILE_NAME = "notes.txt";

// CREATE
async function addNote(content: string) {
  const file = Bun.file(FILE_NAME);
  const existing = (await file.exists()) ? await file.text() : "";
  const timestamp = new Date().toLocaleString();
  const note = `[${timestamp}] ${content}\n`;
  await Bun.write(FILE_NAME, existing + note);
  console.log("✅ Catatan berhasil ditambahkan");
}

// READ
async function readNotes() {
  const file = Bun.file(FILE_NAME);
  if (!await file.exists()) {
    console.log("📭 Belum ada catatan");
    return;
  }
  const content = await file.text();
  const lines = content.trim().split("\n").filter(Boolean);
  if (lines.length === 0) {
    console.log("📭 Catatan kosong");
    return;
  }
  console.log("\n--- DAFTAR CATATAN ---");
  lines.forEach((line, i) => {
    console.log(`${i + 1}. ${line}`);
  });
}

// UPDATE
async function updateNote(number: number, newContent: string) {
  const file = Bun.file(FILE_NAME);
  if (!await file.exists()) {
    console.log("📭 Tidak ada file catatan");
    return;
  }
  const content = await file.text();
  const lines = content.trim().split("\n").filter(Boolean);
  if (number < 1 || number > lines.length) {
    console.log("❌ Nomor catatan tidak valid");
    return;
  }
  const timestamp = new Date().toLocaleString();
  lines[number - 1] = `[${timestamp}] ${newContent}`;
  await Bun.write(FILE_NAME, lines.join("\n") + "\n");
  console.log("✏️ Catatan berhasil diperbarui");
}

// DELETE
async function deleteNote(number: number) {
  const file = Bun.file(FILE_NAME);
  if (!await file.exists()) {
    console.log("📭 Tidak ada file catatan");
    return;
  }
  const content = await file.text();
  const lines = content.trim().split("\n").filter(Boolean);
  if (number < 1 || number > lines.length) {
    console.log("❌ Nomor catatan tidak valid");
    return;
  }
  const removed = lines.splice(number - 1, 1);
  await Bun.write(FILE_NAME, lines.join("\n") + "\n");
  console.log(`🗑️ Catatan dihapus: ${removed}`);
}

// LOGIKA CLI
const command = Bun.argv[2];
const value = Bun.argv[3];
const extra = Bun.argv[4];

if (command === "list" || command === "view") {
  await readNotes();
}
else if (command === "delete") {
  if (!value) {
    console.log("⚠️ Contoh: bun run index.ts delete 1");
  } else {
    const num = parseInt(value);
    if (isNaN(num)) {
      console.log("❌ Nomor harus berupa angka");
    } else {
      await deleteNote(num);
      await readNotes();
    }
  }
}
else if (command === "update") {
  if (!value || !extra) {
    console.log('⚠️ Contoh: bun run index.ts update 2 "isi baru"');
  } else {
    const num = parseInt(value);
    if (isNaN(num)) {
      console.log("❌ Nomor harus berupa angka");
    } else {
      await updateNote(num, extra);
      await readNotes();
    }
  }
}
else if (command) {
  await addNote(command);
  await readNotes();
}
else {
  console.log(`📝 DAILY NOTES - CLI`);
  console.log(`Perintah:`);
  console.log(`  Tambah : bun run index.ts "isi catatan"`);
  console.log(`  Lihat  : bun run index.ts list`);
  console.log(`  Edit   : bun run index.ts update [nomor] "isi baru"`);
  console.log(`  Hapus  : bun run index.ts delete [nomor]`);
}
