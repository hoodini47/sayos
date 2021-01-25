// import React, { useEffect, useContext } from "react"
// import { Swiper, SwiperSlide } from "swiper/react"
// import SwiperCore, {
//   Navigation,
//   Pagination,
//   Scrollbar,
//   A11y,
//   EffectFade,
//   Mousewheel,
// } from "swiper"

// import Header from "../components/Header/header"
// import Menu from "../components/Menu/menu"

// import myContext from "../../context"

// SwiperCore.use([
//   Navigation,
//   Pagination,
//   Mousewheel,
//   Scrollbar,
//   A11y,
//   EffectFade,
// ])

// const ClientHouseProject = props => {
//   let {
//     houseProject,
//     interiorProject,
//     menuRightProject,
//     menuLeftProject,
//     about,
//     category,
//     offer,
//   } = props.data

//   const context = useContext(myContext)

//   useEffect(() => {
//     context.navToggled ? context.handleNavToggle() : console.log("nav open")
//   }, [])

//   return (
//     <>
//       <Header logoLight />
//       <Menu
//         dataMenu={menuRightProject}
//         dataMenuLeft={menuLeftProject}
//         about={about}
//         houseProject={houseProject}
//         interiorProject={interiorProject}
//         category={category}
//         offer={offer}
//       />

//       <div className={`subpage subpage-offer`}>
//         <div className="subpage-content-wrapper">
//           <h1
//             className={`subpage-title ${
//               props.transitionStatus === `entered`
//                 ? `subpage-title-entered`
//                 : ``
//             }`}
//           >
//             {houseProject.pageName}
//           </h1>
//           <Swiper
//             spaceBetween={50}
//             slidesPerView={1}
//             mousewheel
//             navigation
//             pagination={{ clickable: true }}
//             // effect="fade"
//             // scrollbar={{ draggable: true }}
//             // onSlideChange={() => console.log("slide change")}
//             // onSwiper={swiper => console.log(swiper)}
//           >
//             {houseProject.modularContent.map((node, index) => (
//               <SwiperSlide key={index}>
//                 <div
//                   className={`slide-container ${
//                     props.transitionStatus === `entered`
//                       ? `subpage-slide-container-entered`
//                       : ``
//                   }`}
//                   id={`slide-${index}`}
//                 >
//                   <p>{node.slideNumber}</p>
//                   <h2>{node.slideHeader}</h2>

//                   <p className={`text-content`}>{node.slideMainText}</p>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ClientHouseProject

// export const query = graphql`
//   query HouseProjectData($locale: String!) {
//     houseProject: datoCmsHouseProjectForClient(locale: { eq: $locale }) {
//       pageName
//       slug
//       locale
//       modularContent {
//         slideNumber
//         slideHeader
//         slideMainText
//       }
//     }
//     interiorProject: datoCmsInteriorProjectForClient(locale: { eq: $locale }) {
//       pageName
//       slug
//       locale
//       modularContent {
//         slideNumber
//         slideHeader
//         slideMainText
//       }
//     }
//     menuRightProject: datoCmsMenuRight(locale: { eq: $locale }) {
//       adressData1
//       adressData2
//       phoneNumber
//       emailAdress
//       instagramicon {
//         fixed(height: 35) {
//           src
//           base64
//         }
//       }
//       instagramLink
//       facebookicon {
//         fixed(height: 35) {
//           src
//           base64
//         }
//       }
//       facebookLink
//     }
//     menuLeftProject: datoCmsMenuLeft(locale: { eq: $locale }) {
//       projectsHeader
//       projectsSubfield1
//       projectsSubfield2
//       offerHeader
//       offerSubfield
//       aboutHeader
//       individualCustomer
//       individualSubfield1
//       individualSubfield2
//       contactHeader
//     }

//     about: datoCmsAbout(locale: { eq: $locale }) {
//       aboutTitle
//       aboutContent
//       slug
//       locale
//     }

//     logoData: datoCmsHeaderLogoLight {
//       logoImage {
//         fixed {
//           base64
//           src
//         }
//       }
//     }
//     category: datoCmsCategory(locale: { eq: $locale }) {
//       categoryFirst
//       categorySecond
//       locale
//     }

//     offer: datoCmsOffer(locale: { eq: $locale }) {
//       offerArchitectsLogo {
//         fixed {
//           base64
//           src
//         }
//       }
//       offerDesignLogo {
//         fixed {
//           base64
//           src
//         }
//       }
//       offerInteriorsLogo {
//         fixed {
//           base64
//           src
//         }
//       }
//       locale
//       slug
//     }
//   }
// `
