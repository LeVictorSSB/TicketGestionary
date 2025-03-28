# Description

TicketGestionary est une application web de gestion de tickets conçue pour simplifier le suivi de tickets utilisés a des fins d'apprentissage d'autonomie numérique . Cette application permet aux structures de créer, assigner, et gérer des tickets dans un environnement collaboratif.

# Fonctionnalités

+ Gestion complète des tickets : création, assignation, résolution et fermeture
+ Interface utilisateur intuitive : navigation simple et informations claires
+ Différents rôles utilisateurs : administrateurs, techniciens et utilisateurs standards
+ Suivi en temps réel : statut des tickets et historique des modifications

# Prérequis
 
 + NPM (v6.0.0 ou supérieur)

# Installation

Clonez le dépôt et ouvrez le :
```bash
git clone https://github.com/LeVictorSSB/TicketGestionary.git
```

```bash
cd TicketGestionary
```
Installez Bootstrap :
```bash
npm install bootstrap@5.3.2
```

Installez webpack-dev :
```bash
npm install webpack-dev-server --save-dev
```

# Utilisation

Lancez l'application avec :

```bash
npm run start
```

L'application sera accessible à l'adresse http://localhost:8080/

## Architecture
 
TicketGestionary utilise une architecture MVC (Modèle-Vue-Contrôleur) :
    
Les Modèles définissent la structure des données et les interactions avec l'API
Les Vues gèrent l'affichage et l'interface utilisateur
Les Contrôleurs contiennent la logique métier et font le lien entre les modèles et les vues

## Flux de travail des tickets

Création : L'administrateur crée un ticket assigné à une structure distributrice
Assignation : La structure distribue le ticket en l'assignant a un particulier
Validation : La structure réceptrice confirme l'utilisation du ticket quand le particulier se rends sur place

### Technologies utilisées

 
Frontend : JavaScript vanilla, HTML5, CSS3, Bootstrap
Build/Bundle : Webpack-npm