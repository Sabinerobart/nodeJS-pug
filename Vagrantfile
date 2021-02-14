# -*- mode: ruby -*-
# vi: set ft=ruby :


Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-16.04"

  config.vm.define "node-tuto"

  config.vm.provider "virtualbox" do |v|
    v.memory = 4096
    v.cpus = 2
  end

  #config.vm.network "private_network", ip: "192.168.50.4"
  # config.vm.network "private_network", type: "dhcp"

  config.vm.network "forwarded_port", guest: 3000, host: 3333

  config.vm.provision "shell", inline: <<-SHELL
    # yarn
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    # nodejs 14
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    #java
    apt-get -y install apache2 openjdk-8-jdk
    update-alternatives --config java
    sudo apt-get install -y \
      nodejs \
      software-properties-common \
      python-software-properties \
      python3-venv python3-pip \
      yarn
    # app
    echo "cd /vagrant" >> /home/vagrant/.bashrc
    cd /vagrant && yarn install
  SHELL
end