import   { greet } from '@/lib/greet.js';

async function main() {
  console.log(greet('World'));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
