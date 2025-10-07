"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BackButton({ link = undefined }: { link?: string }) {
  const router = useRouter();

  const onClick = () =>
    window.history.length > 1 ? router.back() : router.push("/");

  const style =
    "z-10 px-3 py-1 rounded bg-black/30 text-white hover:bg-black/50 transition";

  return (
    <>
      {link ? (
        <Link href={link} className={style}>
          Zpět
        </Link>
      ) : (
        <button onClick={onClick} className={style}>
          Zpět
        </button>
      )}
    </>
  );
}
