import React from "react";
import Layout from "../components/layout";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

const BigText = styled.div`
  font-family: ${(props) => props.theme.fonts.Header};
  font-size: 4rem;
  margin: 3rem auto;
  margin-bottom: 10rem;
  line-height: 4rem;
  letter-spacing: -1px;
  p {
    margin: 4rem 0;
  }
`;
const Emphasis = styled.strong`
  color: ${(props) => props.theme.colors.Sienna};
`;
const Emphasis2 = styled.strong`
  color: ${(props) => props.theme.colors.Emerald};
`;

const HeroPanel = () => {
  return (
    <BigText>
      <p>
        <span role="img" ariaLabel="hand waving">
          👋
        </span>{" "}
        Hi,
      </p>
      <p>
        {"I'm"} <Emphasis2>Michael Sendker</Emphasis2>, and this is{" "}
        <Emphasis>Standingwater</Emphasis>.
      </p>
      <p>
        Really {"it's"} just me. <Emphasis>Standingwater LLC</Emphasis> is just
        me.
      </p>
      <p>
        {"I'm"} a software developer from Central Florida obsessed with learning
        new things. And <Emphasis>Standingwater</Emphasis> is my one-man agency.
        My <Link to="/projects">projects page</Link> showcases my work, and my{" "}
        <Link to="/blog">blog page</Link> showcases my thoughts.
      </p>
      <p>
        But if you want to know who I am, keep scrolling.
        <span role="img" ariaLabel="hand pointing down">
          👇
        </span>
      </p>
    </BigText>
  );
};

const PictureText = styled.div`
  background-color: ${(props) => props.theme.colors.Amber}4F;
  color: white;
  text-shadow: 2px 2px ${(props) => props.theme.colors.Charcoal};
  font-weight: 1000;
  padding 10px 10px;

  letter-spacing: -1px;
  text-align: justify;
  text-justify: inter-character;
  hyphens: auto;
  font-size: 4rem;
  line-height: 3.9rem;
`;

const PicturePanel = ({ bgpic }) => {
  return (
    <div style={{ display: "grid" }}>
      <GatsbyImage
        style={{ gridArea: "1/1" }}
        layout="fullWidth"
        aspectRatio={2 / 1}
        image={bgpic}
        alt=""
      />
      <div
        style={{
          gridArea: "1/1",
          position: "relative",
          placeItems: "center",
          display: "grid",
        }}
      >
        <PictureText>
          Palmettos and slash pine, Muscadine running wild and ibises probing
          the damp ground after a violent thunderstorm. Standing water and
          mosquitos have been a part of this landscape for hundreds of millions
          of years, through everything. These woods and their pooling waters
          have seen Timucua and Calusa, Appalachee and Seminoles, Spanish
          Conquistadores and French Huguenots, bucanneers like José Gaspar,
          Haitian rebels like Georges Biassou, Cuban exiles, Puerto Rican
          refugees, and immigrants from all over the world. This is the Florida
          you don't see in brochures. This is{" "}
          <Emphasis>Standingwater.</Emphasis> Timelessness and Change.
        </PictureText>
      </div>
    </div>
  );
};

const MediumText = styled.div`
  font-family: ${(props) => props.theme.fonts.Header};
  font-size: 2rem;
  margin: 8rem auto;
  margin-bottom: 10rem;
  letter-spacing: -2px;
  p {
    margin: 2rem 0;
  }
`;
const Quote = styled.h4``;

const AboutPanel = () => {
  return (
    <MediumText>
      <p>
        The point is this: software is about timelessness and change. You have
        to think about the past and the future, and the diversity of your
        options.  It's always in the back of your mind. Tech debt, project
        structure, dependency choices. You have to think about who will inherit
        your code, just as the Earth. It's all a careful game of timelessness
        and change.
      </p>
      <Quote>
        Computer Science is Applied Math, and Software Engineering is Applied
        Philosophy
      </Quote>
      <p>
        I have never seen a more apt metaphor. I majored in Philosophy at
        Florida State University and started programming because I was obsessed
        with literature and wanted a better resource for picking it apart. I
        built <a href="https://anno.wiki">anno.wiki</a>. With that project I
        learned Python and JavaScript, Flask and SQLAlchemy, deployment and
        maintenance, database design and application structuring. I found myself
        fascinated by how much deep thinking I had to do about the long term
        maintainability and expansibility of the project itself.
      </p>

      <p>
        In short, I fell in love with software. A few years later I started
        working in the industry. I've done contracts and W2s. All I know is
        this: I love the philosophy of it. The choices between static and
        dynamic languages, opinionated and unopinionated frameworks, fast code
        and readable code. Reading a book is a lot like talking to someone in
        the past. Writing code is a lot like talking to someone in the future.
      </p>
    </MediumText>
  );
};


const IndexPage = ({ data }) => {
  const bgpic = data.hero.childImageSharp.gatsbyImageData;
  return (
    <Layout>
      <div style={{ height: 1 }} />
      <HeroPanel />
      <PicturePanel bgpic={bgpic} />
      <AboutPanel />
    </Layout>
  );
};

export const query = graphql`
  query {
    hero: file(name: { eq: "palmettos" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`;

export default IndexPage;
