import glob
from setuptools import setup, find_packages

setup(name='vpn-indicator',
      version='1.0.1',
      description='VPN Indicator for Ubuntu',
      author='Tualatrix Chou',  
      author_email='tualatrix@gmail.com',
      url='http://imtx.me/',
      scripts=['vpn-indicator', 'vpn-indicator-daemon'],
      packages=find_packages(),
      data_files=[
          ('../etc/dbus-1/system.d/', ['data/vpn-indicator-daemon.conf']),
          ('../etc/xdg/autostart/', ['data/vpn-indicator.desktop']),
          ('share/vpn-indicator/', glob.glob('data/*.ui')),
          ('share/dbus-1/system-services', ['data/me.imtx.vpndaemon.service']),
          ('share/applications', ['data/vpn-indicator.desktop']),
          ],
      license='GNU GPL',
      platforms='linux',
      test_suite='tests',
)
