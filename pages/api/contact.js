import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, company, message } = req.body;

        // Validation basique
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Champs manquants' });
        }

        // Si pas de configuration SMTP, on simule l'envoi pour le développement
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log("⚠️  SMTP non configuré. Simulation de l'envoi d'email :");
            console.log("De :", email);
            console.log("Message :", message);
            // On simule un délai réseau
            await new Promise(resolve => setTimeout(resolve, 1000));
            return res.status(200).json({ success: true, message: "Email simulé (dev mode)" });
        }

        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Pour Gmail. Sinon utiliser host/port
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS 
                }
            });

            const mailOptions = {
                from: process.env.SMTP_USER, // L'expéditeur authentifié (Gmail oblige)
                replyTo: email, // Répondre à l'utilisateur
                to: 'marin.leclerc.dev@gmail.com', // Votre adresse de réception
                subject: `Nouveau message de ${name} (Portfolio)`,
                text: `
                    Nom: ${name}
                    Email: ${email}
                    Entreprise: ${company || 'Non renseigné'}
                    
                    Message:
                    ${message}
                `,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #110F09;">Nouveau contact depuis le Portfolio</h2>
                        <ul style="list-style: none; padding: 0;">
                            <li><strong>Nom :</strong> ${name}</li>
                            <li><strong>Email :</strong> <a href="mailto:${email}">${email}</a></li>
                            <li><strong>Entreprise :</strong> ${company || 'Non renseigné'}</li>
                        </ul>
                        <br/>
                        <div style="background: #fcfbf6; padding: 20px; border-left: 4px solid #110F09;">
                            <strong>Message :</strong><br/>
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error("Erreur Nodemailer:", error);
            res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
