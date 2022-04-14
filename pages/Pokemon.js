import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Pokemon({ poke }) {
  return (
    <Layout title={poke.name}>
      <h1 className="text-4xl mb-2 text-center capitalize">{poke.name}</h1>
      <img src={poke.image} alt={poke.name} className="mx-auto" />
      <p>
        <span className="font-bold mr-2">Weight: </span>
        {poke.weight}
      </p>
      <p>
        <span className="font-bold mr-2">Height: </span>
        {poke.height}
      </p>
      <h2 className="text-2xl mt-6 mb-2">Types</h2>
      {poke.types.map((type, index) => (
        <p key={index}>{type.type.name}</p>
      ))}
      <p className="mt-10 text-center">
        <Link href="/">
          <a className="text-2xl underline">Home</a>
        </Link>
      </p>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const poke = await res.json();
    const paddedIndex = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    poke.image = image;

    return {
      props: { poke },
    };
  } catch (err) {
    console.log(err);
  }
}
