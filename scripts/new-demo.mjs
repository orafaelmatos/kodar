#!/usr/bin/env node
/**
 * Cria uma demo nova para um cliente: gera src/demos/clients/<nicho>-<slug>.ts e registra no índice.
 *
 *   npm run demo:new
 *   npm run demo:new -- --niche=odonto --name="Clínica Exemplo" --city=Campinas --state=SP --whatsapp=5519999999999
 *
 * Depois, ajuste os dados no arquivo criado (avaliações, horários, endereço) e abra /demo/<slug>.
 */
import { readFile, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientsDir = join(root, "src/demos/clients");
const NICHES = ["odonto", "oficina", "marmoraria", "marcenaria", "metalurgica"];

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((arg) => arg.startsWith("--"))
    .map((arg) => {
      const [key, ...rest] = arg.slice(2).split("=");
      return [key, rest.join("=")];
    }),
);

// Com argumentos (ou fora de um terminal), não pergunta: usa o valor padrão do que faltar.
const interactive = stdin.isTTY && Object.keys(args).length === 0;
const rl = createInterface({ input: stdin, output: stdout });
async function ask(key, question, fallback = "") {
  if (args[key]) return args[key];
  if (!interactive) return fallback;
  const answer = (await rl.question(`${question}${fallback ? ` (${fallback})` : ""}: `)).trim();
  return answer || fallback;
}

const slugify = (text) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const camel = (text) => text.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
const quote = (text) => JSON.stringify(text);

try {
  const niche = await ask("niche", `Nicho [${NICHES.join(", ")}]`, "odonto");
  if (!NICHES.includes(niche)) throw new Error(`Nicho inválido: ${niche}`);
  const name = await ask("name", "Nome da empresa");
  if (!name) throw new Error("O nome da empresa é obrigatório.");
  const slug = slugify(await ask("slug", "Endereço da demo (/demo/...)", slugify(name)));
  const shortName = await ask("short", "Nome curto para o logo", name);
  const contactName = await ask("contact", "Com quem você está falando (opcional)");
  const city = await ask("city", "Cidade", "Campinas");
  const state = (await ask("state", "Estado (UF)", "SP")).toUpperCase();
  const digits = (await ask("whatsapp", "WhatsApp da empresa com DDD", "19999990000")).replace(/\D/g, "");
  // Número brasileiro sem DDI (10 ou 11 dígitos) ganha o 55 na frente.
  const whatsapp = digits.length <= 11 ? `55${digits}` : digits;

  const fileName = `${niche}-${slug}.ts`;
  const filePath = join(clientsDir, fileName);
  const exists = await access(filePath).then(
    () => true,
    () => false,
  );
  if (exists) throw new Error(`Já existe uma demo em src/demos/clients/${fileName}.`);

  const id = camel(slug.match(/^[0-9]/) ? `demo-${slug}` : slug);
  const lines = [
    `import type { DemoClient } from "../types";`,
    ``,
    `export const ${id}: DemoClient = {`,
    `  slug: ${quote(slug)},`,
    `  niche: ${quote(niche)},`,
    `  name: ${quote(name)},`,
    shortName && shortName !== name ? `  shortName: ${quote(shortName)},` : null,
    contactName ? `  contactName: ${quote(contactName)},` : null,
    `  city: ${quote(city)},`,
    `  state: ${quote(state)},`,
    `  whatsapp: ${quote(whatsapp)},`,
    `  // Complete quando souber: address, hours, since, rating, served, instagram, responsible, testimonials.`,
    `};`,
    ``,
  ].filter((line) => line !== null);
  await writeFile(filePath, lines.join("\n"));

  const indexPath = join(clientsDir, "index.ts");
  let index = await readFile(indexPath, "utf8");
  index = index.replace(
    /(import type { DemoClient } from "..\/types";\n)/,
    `$1import { ${id} } from "./${fileName.replace(/\.ts$/, "")}";\n`,
  );
  index = index.replace(/export const clients: readonly DemoClient\[\] = \[([^\]]*)\];/, (_, list) => {
    const items = list
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    items.push(id);
    return `export const clients: readonly DemoClient[] = [${items.join(", ")}];`;
  });
  await writeFile(indexPath, index);

  console.log(`\nDemo criada: src/demos/clients/${fileName}`);
  console.log(`Endereço: /demo/${slug}`);
  console.log("Complete os dados no arquivo e rode `npm run dev` para ver.\n");
} catch (error) {
  console.error(`\n${error.message}\n`);
  process.exitCode = 1;
} finally {
  rl.close();
}
