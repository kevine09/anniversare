import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBrain, FaBirthdayCake, FaSmileWink } from 'react-icons/fa';
import { GiPartyPopper } from 'react-icons/gi';
import '../styles/Home.css';
import FloatingBook from '../components/FloatingBook';
import FloatingGlobe from '../components/FloatingGlobe';
import FloatingGame from '../components/FloatingGame';
import video from '../assets/video.mp4'
import video1 from '../assets/video1.mp4'



export default function Home() {
  const navigate = useNavigate();
  const containerRef = useRef();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const handleBookClick = () => navigate('/book');

  // Effets de parallaxe
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <div className="parallax-container" ref={containerRef}>
      {/* Section Hero */}
      <motion.section className="hero-section" style={{ y: y1 }}>
        <div className="title-container">
          <h1>
            <span className="word1">C'est</span>
            <span className="word2">l'anniversaire</span>
            <span className="word3">de</span>
            <span className="word4">Kévine</span>
            <span className="year">2025</span>
            <GiPartyPopper className="icon-popper" />
          </h1>
          <motion.h2 
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FaBrain className="icon-brain" />
            Bienvenue dans ma tête
            <FaSmileWink className="icon-wink" />
          </motion.h2>
        </div>
      </motion.section>

      {/* Sections Mémoires */}
      <motion.div className="parallax-group">
        {/* Section 1 */}
        <motion.section 
          className="memory-section section1"
          style={{ y: y2, rotateX }}
        >
          <div className="memory-content">
            <div className="media-group">
              <img src="src/assets/photo1.jpg" alt="Kévine" className="memory-img" />
              <img src="src/assets/photo4.jpg" alt="Kévine" className="memory-img" />
            </div>
            <div className="text-content">
              <p className="quote"> kevine dit souvent : "Ça fait pas bien !"</p>
              <p className="memory-text"> Moi-même je ne sais pas pourquoi je dis ça </p>
            </div>
          </div>
        </motion.section>

        {/* Section 2 */}
        <motion.section 
          className="memory-section section2"
          style={{ y: y2, rotateX: useTransform(scrollYProgress, [0, 1], [0, -15]) }}
        >
          <div className="memory-content reverse">
            <div className="media-group">
              <img src="src/assets/photo2.jpg" alt="Kévine" className="memory-img" />
              <video
                                src={video}
                                autoPlay
                                loop
                                muted
                                className="memory-img video"
                              />
            </div>
            <div className="text-content">
              <p className="quote"> kevine dit souvent : "On fait comment maintenant ? 🙂‍↔️"</p>
              <p className="memory-text"> quand vous me racontez vos problèmes, comme si j'avais la solution.</p>
            </div>
          </div>
        </motion.section>

        {/* Nouvelle Section 3 */}
        <motion.section 
          className="memory-section section3"
          style={{ y: y2, rotateX: useTransform(scrollYProgress, [0, 1], [0, 10]) }}
        >
          <div className="memory-content">
            <div className="media-group">
              <img src="src/assets/phot3.jpg" alt="Kévine" className="memory-img" />
              <img src="src/assets/photo5.jpg" alt="Kévine" className="memory-img" />
            </div>
            <div className="text-content">
              <p className="quote"> kevine dit souvent : " je slay  trop! 🤩"</p>
              <p className="memory-text">Ça, c'est quand je me souviens que ma mère a accouché de la plus belle 💇. </p>
            </div>
          </div>
        </motion.section>

        {/* Nouvelle Section 4 */}
        <motion.section 
          className="memory-section section4"
          style={{ y: y2, rotateX: useTransform(scrollYProgress, [0, 1], [0, -10]) }}
        >
          <div className="memory-content reverse">
            <div className="media-group">
            <video
                                src={video1}
                                autoPlay
                                loop
                                muted
                                className="memory-img video"
                              />
              <img src="src/assets/photo6.jpg" alt="Kévine" className="memory-img" />
            </div>
            <div className="text-content">
              <p className="quote"> kevine dit souvent: "stp fou moi le can 😑"</p>
              <p className="memory-text">Quand vous lui racontez les betises 🙄 </p>
            </div>
          </div>
        </motion.section>
      </motion.div>

      <div className="spacer"></div>

      <FloatingBook onClick={handleBookClick} />
      <FloatingGlobe onClick={() => navigate('/map')} />
      <FloatingGame onClick={() => navigate('/game')} />
    </div>
  );
}