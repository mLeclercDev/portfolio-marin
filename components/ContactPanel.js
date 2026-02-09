import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from "gsap/dist/CustomEase";
import MagneticCTA from './global/MagneticCTA';
import '../styles/components/contact-panel.scss';

gsap.registerPlugin(CustomEase);
CustomEase.create("panelEase", "0.76, 0, 0.24, 1");

const ContactPanel = ({ isOpen, onClose }) => {
    const panelRef = useRef(null);
    const overlayRef = useRef(null);
    const step1Ref = useRef(null);
    const step2Ref = useRef(null);
    
    // Header refs pour animation
    const headerTitleRef = useRef(null);
    const headerDescRef = useRef(null);

    // Refs pour les chiffres du roller
    const digit1Ref = useRef(null);
    const digit2Ref = useRef(null);

    // State
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });

    const hasValue = (field) => formData[field] && formData[field].length > 0;

    // Animation du numéro d'étape
    useEffect(() => {
        const d1 = digit1Ref.current;
        const d2 = digit2Ref.current;

        if(d1 && d2) {
            gsap.killTweensOf([d1, d2]);

            if (step === 2) {
                // Passage à l'étape 2 : 1 part, PUIS 2 arrive
                gsap.to(d1, { y: "-100%", opacity: 0, duration: 0.3, ease: "power2.in" });
                
                gsap.fromTo(d2, 
                    { y: "100%", opacity: 0 },
                    { y: "0%", opacity: 1, duration: 0.4, delay: 0.2, ease: "power2.out" }
                );
            } else {
                // Retour à l'étape 1 : 2 part, PUIS 1 revient
                gsap.fromTo(d1, 
                    { y: "-100%", opacity: 0 },
                    { y: "0%", opacity: 1, duration: 0.4, delay: 0.2, ease: "power2.out" }
                );
                
                gsap.to(d2, { y: "100%", opacity: 0, duration: 0.3, ease: "power2.in" });
            }
        }
    }, [step]);

    useEffect(() => {
        // Selection initiale
        const stepInd = panelRef.current ? panelRef.current.querySelector('.step-indicator') : null;

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setStep(1); 
            
            // Nettoyage des animations précédentes
            if(overlayRef.current) gsap.killTweensOf(overlayRef.current);
            if(panelRef.current) gsap.killTweensOf(panelRef.current);

            // Overlay fade in
            gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, pointerEvents: 'all' });

            // Panel slide in
            gsap.fromTo(panelRef.current, { x: '100%' }, { x: '0%', duration: 0.8, ease: "panelEase" });

            // Reset visuel immédiat des éléments fixes ou cachés
            gsap.set(step1Ref.current, { display: 'flex', x: 0, opacity: 1 });
            gsap.set(step2Ref.current, { display: 'none', x: 50, opacity: 0 });
            gsap.set(headerDescRef.current, { opacity: 1, y: 0 }); // Container opacité 1
            
            // Reset Roller Chiffres
            if(digit1Ref.current && digit2Ref.current) {
                gsap.set(digit1Ref.current, { y: "0%" });
                gsap.set(digit2Ref.current, { y: "100%" });
            }

            // Animation du contenu APRES le render du step 1
            setTimeout(() => {
                if(!panelRef.current) return;

                // Re-sélection fraîche
                const titleLines = panelRef.current.querySelectorAll('.title-line-inner');
                const descLines = panelRef.current.querySelectorAll('.desc-line-inner');
                const currentStepInd = panelRef.current.querySelector('.step-indicator');
                
                // Nettoyage de ces éléments
                gsap.killTweensOf([titleLines, descLines, currentStepInd]);

                // 1. Step Indicator
                if(currentStepInd) {
                    gsap.fromTo(currentStepInd, 
                        { y: 20, opacity: 0 }, 
                        { y: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: "power2.out" }
                    );
                }

                // 2. Title Lines
                if(titleLines.length > 0) {
                     gsap.fromTo(titleLines, 
                        { y: "100%", opacity: 0 }, 
                        { y: "0%", opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.5, ease: "power3.out" }
                     );
                }
                
                // 3. Desc Lines
                if(descLines.length > 0) {
                     gsap.fromTo(descLines, 
                        { y: "100%", opacity: 0 }, 
                        { y: "0%", opacity: 1, duration: 0.8, stagger: 0.05, delay: 0.7, ease: "power3.out" }
                     );
                }

                // 4. Elements Génériques du formulaire
                const elements = panelRef.current.querySelectorAll('.stagger-in:not(.step-indicator), .form-step-1 .form-group, .form-step-1 .form-actions');
                if(elements.length > 0) {
                    gsap.killTweensOf(elements);
                    gsap.fromTo(elements, 
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, delay: 0.3, ease: "power2.out", clearProps: "all" }
                    );
                }

            }, 50);

        } else {
            document.body.style.overflow = '';
            
            // Animation fermeture REVERSE
            if(!panelRef.current) return; // Sécurité

            const titleLines = panelRef.current.querySelectorAll('.title-line-inner');
            const descLines = panelRef.current.querySelectorAll('.desc-line-inner');
            const currentStepInd = panelRef.current.querySelector('.step-indicator'); // Utiliser la classe pour être sûr

            // On tue les anims en cours s'il y en a
            gsap.killTweensOf([titleLines, descLines, currentStepInd]);
            
            const tlClose = gsap.timeline();
            
            // Groupe Textes (Desc -> Title -> Indicator) vers le bas
            const targets = [];
            if(descLines.length) targets.push(...descLines);
            if(titleLines.length) targets.push(...Array.from(titleLines).reverse());
            if(currentStepInd) targets.push(currentStepInd);

            if(targets.length > 0) {
                tlClose.to(targets, {
                    y: "100%", // Vers le bas
                    opacity: 0, 
                    stagger: 0.05,
                    duration: 0.4,
                    ease: "power2.in"
                });
            }
            
            // 2. Overlay Fade Out + Panel Slide Out
            tlClose.to(overlayRef.current, { opacity: 0, duration: 0.5, pointerEvents: 'none' }, "-=0.1");
            tlClose.to(panelRef.current, { x: '100%', duration: 0.6, ease: "panelEase" }, "<");
        }
    }, [isOpen]);

    // ... (Reste du code: validateStep1, inputChange...)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateStep1 = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return formData.name.trim().length > 1 && emailRegex.test(formData.email);
    };

    // Transition fluide entre étapes
    const transitionSteps = (direction) => {
        const outStep = direction === 'next' ? step1Ref.current : step2Ref.current;
        const inStep = direction === 'next' ? step2Ref.current : step1Ref.current;
        
        // Si NEXT : On monte (Sortie -30, Entrée 30 -> 0)
        // Si PREV : On descend (Sortie 30, Entrée -30 -> 0)
        const outY = direction === 'next' ? -30 : 30;
        const inStartY = direction === 'next' ? 30 : -30; // Point de départ de l'entrée
        
        const tl = gsap.timeline();

        // 1. Sortie contenu actuel (Form Step) + Titre/Desc
        tl.to([outStep, headerTitleRef.current, headerDescRef.current], {
            opacity: 0,
            y: outY, 
            x: 0,
            duration: 0.3,
            ease: "power2.inOut"
        });

        // 2. Switch state (invisible)
        tl.call(() => {
            if (direction === 'next') setStep(2);
            else setStep(1);
            
            gsap.set(outStep, { display: 'none' });
            
            // Préparation position entrée (verticale uniquement)
            gsap.set(inStep, { display: 'flex', opacity: 0, y: inStartY, x: 0 });
            // Reset position Titre/Desc pour l'arrivée
            gsap.set([headerTitleRef.current, headerDescRef.current], { y: inStartY });
        });
        
        // Petit délai technique pour React render
        tl.to({}, { duration: 0.05 });

        // 3. Entrée nouveau contenu
        tl.to([inStep, headerTitleRef.current, headerDescRef.current], {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.05,
            clearProps: "y,x" 
        });
    };

    const nextStep = (e) => {
        if(e) e.preventDefault();
        if (!validateStep1()) return;
        transitionSteps('next');
    };

    const prevStep = (e) => {
        if(e) e.preventDefault();
        transitionSteps('prev');
    };

    const formRef = useRef(null);
    const successRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                 // Animation de succès
                 const tl = gsap.timeline();
                 
                 // Masquer le Header, le Formulaire et l'indicateur
                 const headerElements = [
                    panelRef.current.querySelector('.panel-header'),
                    formRef.current
                 ];

                 tl.to(headerElements, {
                     opacity: 0,
                     y: -20,
                     duration: 0.5,
                     ease: "power2.in",
                     stagger: 0.1
                 });

                 tl.set(headerElements, { display: 'none' });
                 
                 // Afficher le message de succès
                 tl.set(successRef.current, { display: 'flex', y: 30 });
                 tl.to(successRef.current, {
                     opacity: 1,
                     y: 0,
                     duration: 0.6,
                     ease: "power2.out",
                     clearProps: "y" // Garder l'opacité
                 });
                 
                 // Reset form state après délai (optionnel, ou au close)
                 setTimeout(() => {
                    setFormData({ name: '', email: '', company: '', message: '' });
                    setStep(1);
                 }, 1000);

            } else {
                throw new Error('Erreur envoi');
            }
        } catch (error) {
            alert("Une erreur s'est produite lors de l'envoi. Vous pouvez me contacter directement par email.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div 
                className={`contact-panel-overlay ${isOpen ? 'open' : ''}`} 
                ref={overlayRef}
                onClick={onClose}
            ></div>
            
            <div className="contact-panel" ref={panelRef}>
                <button className="close-btn stagger-in" onClick={onClose}>
                    Fermer
                    <div className="close-icon">
                        <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"/>
                        </svg>
                    </div>
                </button>

                <div className="panel-content">
                    <div className="panel-header">
                        <span className="step-indicator stagger-in">
                             Étape 
                             <span className="step-count-mask">
                                <span ref={digit1Ref}>1</span>
                                <span ref={digit2Ref}>2</span>
                             </span>
                             / 2
                        </span>
                        <h2 ref={headerTitleRef}>
                            {step === 1 ? (
                                <>
                                    <span className="title-line"><span className="title-line-inner">Commençons par</span></span>
                                    <span className="title-line"><span className="title-line-inner">les présentations</span></span>
                                </>
                            ) : (
                                <>
                                    <span className="title-line"><span className="title-line-inner">Parlez-moi</span></span>
                                    <span className="title-line"><span className="title-line-inner">de votre projet</span></span>
                                </>
                            )}
                        </h2>
                        <p ref={headerDescRef}>
                            {step === 1 ? (
                                <>
                                    <span className="desc-line"><span className="desc-line-inner">Je suis ravi de faire votre connaissance.</span></span>
                                    <span className="desc-line"><span className="desc-line-inner">Dites-moi qui vous êtes.</span></span>
                                </>
                            ) : (
                                <>
                                    <span className="desc-line"><span className="desc-line-inner">J&apos;ai hâte d&apos;en savoir plus.</span></span>
                                    <span className="desc-line"><span className="desc-line-inner">Quel est votre besoin ?</span></span>
                                </>
                            )}
                        </p>
                    </div>

                   <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
                   {/* ... form content ... */}

                        <div className="steps-wrapper">
                            
                            {/* ÉTAPE 1 */}
                            <div className="form-step form-step-1" ref={step1Ref}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        required 
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={hasValue('name') ? 'has-value' : ''}
                                    />
                                    <label htmlFor="name">Votre Nom *</label>
                                </div>
                                
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        required 
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={hasValue('email') ? 'has-value' : ''}
                                    />
                                    <label htmlFor="email">Votre Email *</label>
                                </div>

                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        name="company" 
                                        id="company" 
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        className={hasValue('company') ? 'has-value' : ''}
                                    />
                                    <label htmlFor="company">Entreprise (Optionnel)</label>
                                </div>

                                <div className="form-actions stagger-in">
                                    <button type="button" className="back-btn" disabled>
                                        &nbsp;
                                    </button>
                                    
                                    <div className={`cta-container ${!validateStep1() ? 'disabled' : ''}`}>
                                        <MagneticCTA 
                                            href="#" 
                                            text="Suivant"
                                            className="navbar-cta" 
                                            onClick={nextStep}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ÉTAPE 2 */}
                            <div className="form-step form-step-2" ref={step2Ref} style={{ display: 'none' }}>
                                <div className="form-group">
                                    <textarea 
                                        name="message" 
                                        id="message" 
                                        required
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className={hasValue('message') ? 'has-value' : ''}
                                    ></textarea>
                                    <label htmlFor="message">Décrivez votre projet...</label>
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="back-btn" onClick={prevStep}>
                                        Retour
                                    </button>
                                    
                                    <div className={`cta-container ${!hasValue('message') ? 'disabled' : ''}`}>
                                        <MagneticCTA 
                                            href="#" 
                                            text="Envoyer"
                                            className="navbar-cta" 
                                            onClick={handleSubmit}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>

                   <div className="success-view" ref={successRef}>
                        <h3>Message bien reçu !</h3>
                        <p>Merci de m&apos;avoir contacté. Je reviens vers vous dans les plus brefs délais.</p>
                        
                        <div className="cta-container">
                             <MagneticCTA 
                                href="#"
                                className="navbar-cta"
                                onClick={(e) => { e.preventDefault(); onClose(); }}
                            >
                                Retour au site
                            </MagneticCTA>
                        </div>
                   </div>
                </div>

                <div className="panel-footer stagger-in">
                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/marin-leclerc/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                    <a href="mailto:marin.leclerc.dev@gmail.com" className="email-contact">marin.leclerc.dev@gmail.com</a>
                </div>
            </div>
        </>
    );
};

export default ContactPanel;
