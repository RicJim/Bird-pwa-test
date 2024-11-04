import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex gap-5 p-6 items-center text-2x1 text-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="" href="/">
          App Name
        </Link>
        <div className="">
          <ul className="flex space-x-4">
          <li className="">
              <Link className="" href="/identify">
              identify
              </Link>
            </li>
            <li className="">
              <Link className="" href="/posts">
                Catalogo
              </Link>
            </li>
            <li className="">
              <Link className="" href="/about">
                about
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
