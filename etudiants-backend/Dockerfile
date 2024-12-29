# Étape 1 : Construction avec Maven (Phase de Build)
FROM maven:3.9.6-eclipse-temurin-17 AS build
# Stratégies et principes mis en œuvre :
#   - Optimisation de la taille de l'image (principe) : Réduite dès la phase de build.
#   - Multi-stage build (stratégie) : Isolation de la phase de build pour une image finale minimale.
#   - Technique : Utilisation d'une image `slim` (méthode pour atteindre l'optimisation).

WORKDIR /app
# Principe :
#   - Cohérence et prévisibilité (principe) : Faciliter la maintenance et la compréhension.
#   - Technique : Définition explicite du répertoire de travail (`WORKDIR`).

# Copie sélective des fichiers (Optimisation du cache Docker)
COPY pom.xml .
COPY src/main/resources ./src/main/resources
# Stratégie et principe :
#   - Optimisation du cache Docker (stratégie) : Accélérer les builds incrémentaux.
#   - Technique : Copie de `pom.xml` et `src/main/resources` AVANT le code source.
#   - Mécanisme : Le cache Docker est utilisé tant que ces fichiers ne changent pas.

RUN mvn dependency:go-offline
# Stratégie et principe :
#   - Build reproductible et hors ligne (principe) : Éviter les dépendances externes pendant le build.
#   - Technique : Utilisation de `dependency:go-offline`.
#   - Bénéfice : Améliore la vitesse et la fiabilité.

COPY src ./src
# Principe :
#   - Ordre des opérations (principe) : Assurer la disponibilité des dépendances avant la compilation.
#   - Technique : Copie du code source APRÈS le téléchargement des dépendances.

# Compilation du projet : Spécification explicite des versions du compilateur
RUN mvn clean package -DskipTests -Dmaven.compiler.source=17 -Dmaven.compiler.target=17
# Principe et mise en garde :
#   - Build propre et reproductible (principe) : Éviter les artefacts résiduels.
#   - Technique : Utilisation de `mvn clean package`.
#   - Accélération du build en développement (compromis) : `-DskipTests` (à utiliser avec précaution).
#   - Mise en garde : Les tests doivent être exécutés dans un pipeline CI/CD.

# Étape 2 : Image finale (Phase d'Exécution - Alpine)
FROM eclipse-temurin:17-jre-alpine
# Stratégie et principe :
#   - Minimisation de la taille de l'image (stratégie) : Réduire l'empreinte et améliorer la sécurité.
#   - Technique : Utilisation d'une image de base Alpine.
#   - Implication : Considérer la compatibilité avec `musl libc`.

WORKDIR /app
# Principe :
#   - Cohérence et prévisibilité.

# Copie du JAR (depuis l'étape de build)
COPY --from=build /app/target/etudiants-backend-0.0.1-SNAPSHOT.jar /app/app.jar
# Stratégie :
#   - Minimisation de la taille de l'image (stratégie) : Ne copier que l'artefact nécessaire.
#   - Technique : Utilisation de `COPY --from=build`.

# Limitation de la mémoire (Prévention des OutOfMemoryError)
ENV JAVA_OPTS="-Xmx256m"
# Principe :
#   - Gestion des ressources (principe) : Contrôler l'utilisation des ressources en conteneur.
#   - Technique : Utilisation de `JAVA_OPTS` et `-Xmx`.
#   - Objectif : Prévenir les `OutOfMemoryError`.

# Exposition du port
EXPOSE 8080
# Principe :
#   - Documentation et configuration (principe) : Faciliter la configuration du réseau.
#   - Technique : Utilisation de `EXPOSE`.

# Création d'un utilisateur non root (Sécurité)
RUN addgroup -S spring && adduser -S -G spring spring
USER spring:spring
# Principe :
#   - Sécurité (principe) : Application du principe de moindre privilège.
#   - Technique : Création et utilisation d'un utilisateur non root.

# Commande d'exécution (Signal handling)
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar app.jar"]