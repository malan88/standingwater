import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/layout";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import styled from "styled-components";
import { useTrail, a } from "@react-spring/web";
import { breakpoints } from "../global/breakpoints";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const BigText = styled(a.div)`
  font-family: ${(props) => props.theme.fonts.Header};
  font-size: 4rem;
  margin: 3rem auto;
  margin-bottom: 10rem;
  min-height: 70rem;
  line-height: 4.3rem;
  letter-spacing: -1px;
  p {
    margin: 4rem 0;
  }
  ${breakpoints.vp4} {
    font-size: 3rem;
  }
  ${breakpoints.vp3} {
    font-size: 2rem;
    p {
      margin: 3rem auto;
    }
  }
`;
const Emphasis = styled.strong`
  color: ${(props) => props.theme.colors.Sienna};
`;
const Emphasis2 = styled.strong`
  color: ${(props) => props.theme.colors.Emerald};
`;

const items = [
  <>
    <span role="img" className="wave" aria-label="hand waving">
      👋
    </span>{" "}
    Hi,
  </>,
  <>
    {"I'm"} <Emphasis2>Michael Sendker</Emphasis2>, and this is{" "}
    <Emphasis>Standingwater</Emphasis>.
  </>,
  <>
    Really {"it's"} just me. <Emphasis>Standingwater LLC</Emphasis> is just me.
  </>,
  <>
    {"I'm"} a software developer from Central Florida obsessed with learning new
    things. <Emphasis>Standingwater</Emphasis> is my one-man agency.
  </>,
  <>
    My <Link to="/projects">projects</Link> show my work, and my{" "}
    <Link to="/blog">blog</Link> shows my thoughts. Here's my{" "}
    <a
      href="https://raw.githubusercontent.com/malan88/resume/master/main.pdf"
      title="Resume"
    >
      résumé <FontAwesomeIcon title="Résumé" icon={faFilePdf} />
    </a>{" "}
    and here's my{" "}
    <a href="https://github.com/malan88" title="GitHub">
      GitHub <FontAwesomeIcon title="GitHub" icon={faGithub} />.
    </a>{" "}
    Oh, and my email is <Emphasis2>m at standingwater dot io</Emphasis2>
  </>,
  <>
    But if you want to know how I think (and that's really what this is all
    about, right?), then keep scrolling.{" "}
    <span role="img" className="point" aria-label="hand pointing down">
      👇
    </span>
  </>,
];

const HeroPanel = () => {
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 250 },
    lineHeight: 1,
    opacity: 1,
    from: { lineHeight: 0, opacity: 0 },
  });

  return (
    <BigText>
      {trail.map(({ lineHeight, opacity }, index) => (
        <a.p key={index} style={{ lineHeight, opacity }}>
          {items[index]}
        </a.p>
      ))}
    </BigText>
  );
};

const PictureText = styled.div`
  background-color: ${(props) => props.theme.colors.Amber}9F;
  color: white;
  text-shadow: 2px 2px ${(props) => props.theme.colors.Charcoal};
  font-weight: 1000;
  padding: 10px 10px;

  letter-spacing: -1px;
  text-align: justify;
  word-break: break-all;
  hyphens: auto;
  font-size: 4rem;
  line-height: 3.9rem;
  ${breakpoints.vp7} {
    font-size: 3rem;
    line-height: 3.2rem;
  }
  ${breakpoints.vp4} {
    font-size: 2rem;
    line-height: 2rem;
  }
  ${breakpoints.vp3} {
    font-size: 2rem;
    line-height: 2rem;
  }
`;
const tmp = `
Palmettos and slash pine, Muscadine running wild and ibises probing the damp
ground after a thunderstorm. Standing water and mosquitos have been a part of
this landscape for hundreds of millions of years.  These woods and their pooling
waters have seen Timucua and Calusa, Appalachee and Seminoles, Spanish
Conquistadores and French Huguenots, buccaneers like José Gaspar, Haitian rebels
like Georges Biassou, Cuban exiles, Puerto Rican refugees, and immigrants from
all over the world. That is the Florida you don't see in brochures.`;
const pictureText = [];
for (let word of tmp.split(" ")) pictureText.push(word + " ");
const extra = [<em>That</em>, " is ", <Emphasis2>Standingwater.</Emphasis2>];

const PicturePanel = ({ bgpic }) => {
  const items = [...pictureText, ...extra];
  const ref = useRef();
  const [open, set] = useState(false);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    x: open ? 0 : 20,
    height: open ? 1 : 0,
    opacity: open ? 1 : 0,
    from: { x: 20, height: 0, opacity: 0 },
  });
  const observer = new IntersectionObserver(([entry]) => {
    if (!open) set(entry.isIntersecting);
  }, {});

  useEffect(() => {
    console.log("Triggering");
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  });

  return (
    <div ref={ref} style={{ display: "grid" }}>
      <GatsbyImage
        style={{ gridArea: "1/1" }}
        layout="fullWidth"
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
          {trail.map(({ height, opacity }, i) => (
            <a.span key={i} style={{ opacity: opacity }}>
              {items[i]}
            </a.span>
          ))}
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
        The point is this: software is about eternity{" "}
        <span role="img" aria-label="eternal rock">
          🪨
        </span>{" "}
        and <span className="change">change</span>. You have to think about the
        past and the future, and the diversity of your options. It's always in
        the back of your mind. Tech debt, project structure, dependency choices.
        You have to think about who will inherit your code, just as the Earth.
        It's all a careful game of eternity and change.
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
        working in the industry. I've done contracts and W2s, frontend, backend,
        and fullstack. I've done scrapers and hardware. But all I know is this:
        I love the philosophy of it. The choices between static and{" "}
        <span className="dynamic" style={{ display: "inline-block" }}>
          dynamic
        </span>{" "}
        languages, opinionated and unopinionated frameworks, fast code and
        readable code. Is this one-liner too complex? Should I{" "}
        <span style={{ color: "grey" }}>/* drop in a comment */</span> or just
        rewrite it?
      </p>
      <p>
        Reading a book is a lot like listening to someone in the past. Writing
        code is a lot like talking to someone in the future.
      </p>
      <p>
        If you agree, I hope to hear from you. Drop me a line. Say hi!{" "}
        <span
          role="img"
          style={{ fontSize: "5rem", verticalAlign: -10 }}
          className="wave"
          aria-label="peace sign"
        >
          ✌️
        </span>
      </p>
    </MediumText>
  );
};

const IndexPage = ({ data }) => {
  const bgpic = data.palmetto.childImageSharp.gatsbyImageData;
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
    palmetto: file(name: { eq: "palmettos" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    allMarkdownRemark(filter: { fields: { collection: { eq: "current" } } }) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            short
            url
            category
            tags
          }
        }
      }
    }
  }
`;

export default IndexPage;
