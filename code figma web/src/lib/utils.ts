export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "..." : str;
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

export function getDiscountedPrice(price: number, discount: number): number {
  return Math.round(price * (1 - discount / 100));
}

export function whatsappUrl(message?: string): string {
  const phone = "2347067797360";
  const defaultMsg = "Hello Emmytech, I would like to make an enquiry about your products/services.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message || defaultMsg)}`;
}
