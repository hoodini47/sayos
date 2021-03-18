import React, { Component, createRef } from "react"
import { StaticQuery, graphql } from "gatsby"
import LazyLoad from "react-lazyload"
import TransitionLink from "gatsby-plugin-transition-link"
import "react-lazy-load-image-component/src/effects/blur.css"
import Consumer from "../../context"
import { CgArrowUp, CgArrowDown } from "react-icons/cg"
import { IconContext } from "react-icons"
import Header from "../components/Header/header"
import Menu from "../components/Menu/menu"

import BackgroundImage from "gatsby-background-image"

class ProjectPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogoBackgroundDark: false,
      arrowRightLinksToNextProject: false,
      otherProjectInThisCategory: [],
      indexOfCurrentProject: null,
    }
  }

  componentDidMount() {
    /***ARROWS */
    const arrowButtonLeft = document.querySelector(".box-bt-left")
    const arrowButtonRight = document.querySelector(".box-bt-right")

    arrowButtonRight.classList.add("arrow-entered")

    //Scroll Up Arrow
    const targetScrollUpArrow = document.querySelector(".lazyload-wrapper") //top section
    const scrollUpArrow = document.querySelector(".box-bt-left")

    function callbackScrollUpArrow(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrollUpArrow.classList.remove("arrow-entered")
        } else {
          scrollUpArrow.classList.add("arrow-entered")
        }
      })
    }

    let optionsScrollUpArrow = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "100px",
      threshold: 0.7,
    }

    let observerScrollUpArrow = new IntersectionObserver(
      callbackScrollUpArrow,
      optionsScrollUpArrow
    )

    if (targetScrollUpArrow) {
      observerScrollUpArrow.observe(targetScrollUpArrow)
    }

    //Scroll Down Arrow
    const targetScrollDownArrow = document.querySelector("#project-page-end")

    const scrollDownArrow = document.querySelector(".box-bt-right")

    function callbackScrollDownArrow(entries, observer) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.5) {
          scrollDownArrow.classList.remove("arrow-unrotated-right")
          scrollDownArrow.classList.add("arrow-rotated-right")
          // this.setState({ arrowRightLinksToNextProject: true })
        }

        if (entry.intersectionRatio < 0.5) {
          scrollDownArrow.classList.remove("arrow-rotated-right")
          scrollDownArrow.classList.add("arrow-unrotated-right")
          // this.setState({ arrowRightLinksToNextProject: false })
        }
      })
    }

    let optionsScrollDownArrow = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "100px",
      threshold: 0.7,
    }

    let observerScrollDownArrow = new IntersectionObserver(
      callbackScrollDownArrow,
      optionsScrollDownArrow
    )

    if (targetScrollDownArrow) {
      observerScrollDownArrow.observe(targetScrollDownArrow)
    }

    /***LOGO COLOR CHANGE */
    const targetLogoChange = document.querySelector(
      "#project-content-middle-end"
    )

    const callbackLogoChange = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          this.setState({ isLogoBackgroundDark: true })
        } else {
          this.setState({ isLogoBackgroundDark: false })
        }
      })
    }

    //only for desktop
    const mediaQueryDesktop = window.matchMedia("(min-width: 992px)")
    function handleDesktopChange(e) {
      if (e.matches) {
        console.log("Media Query Desktop Matched!")

        let optionsLogoChange = {
          root: document.querySelector("#scrollArea"),
          rootMargin: "0px",
        }

        let observerLogoChange = new IntersectionObserver(
          callbackLogoChange,
          optionsLogoChange
        )

        if (targetLogoChange) {
          observerLogoChange.observe(targetLogoChange)
        }
      }
    }

    mediaQueryDesktop.addListener(handleDesktopChange)
    handleDesktopChange(mediaQueryDesktop)

    let { projects } = this.props.data
    const { thisProjectData } = this.props.pageContext

    /***NAVIGATION BETWEEN PROJECTS IN THE SAME CATEGORY***/
    let projectsInThisCategory = []
    let indexOfThisPoject

    projects.nodes
      .sort((a, b) => {
        const positionA = a.position
        const positionB = b.position
        let comparision = 0
        if (positionA > positionB) {
          comparision = 1
        } else if (positionA < positionB) {
          comparision = -1
        }
        return comparision
      })
      .map(project => {
        if (project.projectCategory === thisProjectData.projectCategory) {
          projectsInThisCategory.push(project)
        }
        return projectsInThisCategory
      })

    projectsInThisCategory.map((project, i) => {
      if (project.id === thisProjectData.id) {
        indexOfThisPoject = i
      }
      return
    })

    this.setState(prevState => ({
      otherProjectInThisCategory: [...projectsInThisCategory],
    }))

    this.setState(prevState => ({
      indexOfCurrentProject: indexOfThisPoject,
    }))

    setTimeout(() => {
      console.log(this.state)
    }, 3000)
  }

  render() {
    let {
      projects,
      menuRightProject,
      menuLeftProject,
      about,
      logoData,
      houseProject,
      interiorProject,
      category,
      offer,
    } = this.props.data

    const { thisProjectData } = this.props.pageContext

    const menuStyle = `menuStyleFixed`

    this.topRef = createRef()
    this.nextSectionRef = createRef()

    // const myBgImage = props => (
    //   <StaticQuery
    //     query={graphql`
    //       query {
    //         images: allFile {
    //           edges {
    //             node {
    //               relativePath
    //               name
    //               childImageSharp {
    //                 fluid(maxWidth: 600) {
    //                   ...GatsbyImageSharpFluid
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     `}
    //     render={data => {
    //       const image = data.images.edges.find(n => {
    //         return n.node.relativePath.includes(props.filename);
    //       });
    //       if (!image) {
    //         return null;
    //       }

    //       //const imageSizes = image.node.childImageSharp.sizes; sizes={imageSizes}
    //       return <Img alt={props.alt} fluid={image.node.childImageSharp.fluid} />;
    //     }}
    //   />
    // );

    // console.log(projectsInThisCategory)

    // console.log(`thisProjectData: ${thisProjectData.projectCategory}`)

    // const { locale } = this.props.pageContext.locale;

    // const { fullScreenPhoto } = this.props.pageContext.fullScreenPhoto;

    const handleArrowPrev = e => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

    // const handleArrowNext = () =>
    // this.nextSectionRef.current.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    // });

    const handleArrowNext = e => {
      let pageHeight = window.innerHeight
      window.scrollBy({
        top: pageHeight,
        behavior: "smooth",
      })
    }

    // console.log(this.props.transitionStatus)

    // handleScroll = (e) => {
    //   const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    //   if (bottom) {

    //    }
    // }

    return (
      <div>
        <Header isLogoBackgroundDark={this.state.isLogoBackgroundDark} />
        <Menu
          dataMenu={menuRightProject}
          dataMenuLeft={menuLeftProject}
          dataProjects={projects}
          menuStyle={menuStyle}
          about={about}
          logoData={logoData}
          houseProject={houseProject}
          interiorProject={interiorProject}
          category={category}
          offer={offer}
        />

        <div className={`arrow-box box-bt-left`} onClick={handleArrowPrev}>
          <div className={`menu-trigger`}>
            <IconContext.Provider
              value={{ color: "white", size: "4em", height: "100" }}
            >
              <CgArrowUp />
            </IconContext.Provider>
          </div>
        </div>

        <div className={`arrow-box box-bt-right`} onClick={handleArrowNext}>
          <div className={`menu-trigger`}>
            <IconContext.Provider
              value={{ color: "white", size: "4em", height: "100" }}
            >
              <CgArrowDown />
            </IconContext.Provider>
          </div>
        </div>

        <LazyLoad ref={this.topRef} className={`project-content-top`}>
          <div
            className={`slide-bg-fullscreen`}
            css={{
              backgroundImage: `url(
                              ${thisProjectData.fullScreenPhoto.fluid.src}
                            )`,
            }}
          ></div>
        </LazyLoad>

        <div className="project-content-middle" ref={this.nextSectionRef}>
          <div className="content section-left">
            <div className="content-wrapper">
              <div className="text-container">
                <h2>{thisProjectData.titlePart1}</h2>
                <h2>{thisProjectData.titlePart2}</h2>
                <div className="project-description">
                  <p>{thisProjectData.projectDescription}</p>
                  <p>
                    {thisProjectData.areaText}:{" "}
                    <strong>{thisProjectData.areaValue}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="content section-right"
            css={{
              backgroundImage: `url(
                                      ${thisProjectData.secondaryPhoto.fluid.src}
                                    )`,
              backgroundSize: `cover`,
              backgroundPosition: `center`,
            }}
          ></div>

          <span
            id="project-content-middle-end"
            css={{
              height: `1em`,
              width: `100%`,
              display: `block`,
              position: `absolute`,
              bottom: `1em`,
            }}
          ></span>
        </div>

        <div
          className="project-page-content-bottom"
          css={{
            display: `flex`,
            flexWrap: `wrap`,
          }}
        >
          {thisProjectData.gallery.map((element, index) => {
            return (
              <div
                key={index}
                className={`visualization-tile visualization-tile__width-${element.width}`}
                css={{
                  backgroundImage: `url(
                                        ${element.visualizationImage.fluid.src}
                                      )`,
                  backgroundSize: `cover`,
                  backgroundPosition: `bottom`,
                  width: `${element.width === 1 ? `100%` : ""} ${
                    element.width === 2 ? `50%` : ""
                  } ${element.width === 3 ? `33.33%` : ""}`,
                  height: `50em`,
                  display: `flex`,
                  flexFlow: `column`,
                  justifyContent: `flex-end`,
                }}
              >
                {element.visualizationImageText ? (
                  <p
                    css={{
                      minHeight: `4em`,
                      padding: `1em`,
                      display: `flex`,
                      alignSelf: `flex-end`,
                      alignItems: `center`,
                    }}
                  >
                    {element.visualizationImageText}
                  </p>
                ) : (
                  ""
                )}
              </div>
            )
          })}
        </div>
        <span
          id="project-page-end"
          css={{
            height: `1em`,
            display: `block`,
            position: `absolute`,
            bottom: `0`,
          }}
        ></span>
      </div>
    )
  }
}

export default ProjectPage

export const query = graphql`
  query thisProjectData($locale: String!) {
    projects: allDatoCmsProject(filter: { locale: { eq: $locale } }) {
      nodes {
        slug
        locale
        id
        position
        titlePart1
        titlePart2
        readMore
        fullScreenPhoto {
          fluid {
            src
            base64
            srcSet
          }
        }
        secondaryPhoto {
          fluid {
            src
            base64
            srcSet
          }
        }
        projectCategory
        projectDescription
        areaText
        areaValue
        gallery {
          visualizationImage {
            fluid {
              src
            }
          }
          visualizationImageText
          width
        }
      }
    }

    menuRightProject: datoCmsMenuRight(locale: { eq: $locale }) {
      adressData1
      adressData2
      phoneNumber
      emailAdress
      instagramicon {
        fixed(height: 35) {
          src
          base64
        }
      }
      instagramLink
      facebookicon {
        fixed(height: 35) {
          src
          base64
        }
      }
      facebookLink
    }
    menuLeftProject: datoCmsMenuLeft(locale: { eq: $locale }) {
      projectsHeader
      projectsSubfield1
      projectsSubfield2
      offerHeader
      offerSubfield
      aboutHeader
      individualCustomer
      individualSubfield1
      individualSubfield2
      contactHeader
    }

    about: datoCmsAbout(locale: { eq: $locale }) {
      aboutTitle
      aboutContent
      slug
      locale
    }

    logoData: datoCmsHeaderLogoLight {
      logoImage {
        fixed {
          base64
          src
        }
      }
    }

    houseProject: datoCmsHouseProjectForClient(locale: { eq: $locale }) {
      pageName
      slug
      locale
      modularContent {
        slideNumber
        slideHeader
        slideMainText
      }
    }
    interiorProject: datoCmsInteriorProjectForClient(locale: { eq: $locale }) {
      pageName
      slug
      locale
      modularContent {
        slideNumber
        slideHeader
        slideMainText
      }
    }
    category: datoCmsCategory(locale: { eq: $locale }) {
      categoryFirst
      categorySecond
      locale
    }

    offer: datoCmsOffer(locale: { eq: $locale }) {
      offerBackgroundImage {
        fluid {
          src
          base64
        }
      }
      offerArchitectsLogo {
        fixed {
          base64
          src
        }
      }
      offerDesignLogo {
        fixed {
          base64
          src
        }
      }
      offerInteriorsLogo {
        fixed {
          base64
          src
        }
      }
      locale
      slug
    }
  }
`
