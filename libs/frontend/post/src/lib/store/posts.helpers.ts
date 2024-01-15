let id = 1;

export function getNextId(): string {
  return (id++).toString();
}
