# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.183.0/containers/javascript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12 (overriden in .devcontainer)
ARG VARIANT="20-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:1-${VARIANT}

# Configure apt
ENV DEBIAN_FRONTEND=noninteractive

# Installing additional OS Packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends \
    gconf-service libxext6 libxfixes3 libxi6 libxrandr2 \
    libxrender1 libcairo2 libcups2 libdbus-1-3 libexpat1 \
    libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 \
    libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 \
    libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
    libxdamage1 libxss1 libxtst6 libappindicator1 libnss3 libasound2 \
    libatk1.0-0 libc6 libdrm-dev libgbm-dev ca-certificates fonts-liberation lsb-release xdg-utils \
    curl \
    git-core \
    gnupg \
    linuxbrew-wrapper \
    locales \
    zsh \
    wget \
    tree \
    jq \
    fonts-powerline \
    # set up locale
    && locale-gen en_US.UTF-8 && fc-cache -vf

ENV DEBIAN_FRONTEND=dialog
ENV SHELL=/bin/zsh

# [Optional] Uncomment if you want to install an additional version of node using nvm
ARG EXTRA_NODE_VERSION=22
RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
#RUN su node -c "npm install -g <your-package-list-here>"

# Enable pnpm
RUN corepack enable pnpm


# Use Yarn 2
RUN yarn set version berry

ARG USER="node"
ARG GROUP="node"

USER ${USER}

# Make variables available in Shell Env
ENV USER=${USER}
ENV GROUP=${GROUP}

# Install Oh-my-ZSH
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true

# Install powerlevel10k
RUN git clone https://github.com/romkatv/powerlevel10k.git /home/${USER}/.oh-my-zsh/custom/themes/powerlevel10k

ADD --chown=${USER}:${GROUP} .zshrc /home/${USER}

# Configure Linuxbrew
RUN brew update || true
# Install handy plugins
RUN brew install zsh-autosuggestions zsh-syntax-highlighting

# Restore cache ownership
RUN sudo chown -R ${USER}:${GROUP} ~/.cache