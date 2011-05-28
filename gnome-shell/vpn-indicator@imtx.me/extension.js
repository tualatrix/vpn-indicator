const St = imports.gi.St;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const PanelMenu = imports.ui.panelMenu;
const Shell = imports.gi.Shell;
const Lang = imports.lang;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;

const Gettext = imports.gettext;
const _ = Gettext.gettext;

function VpnIndicator() {
   this._init.apply(this, arguments);
}

VpnIndicator.prototype = {
    __proto__: PanelMenu.Button.prototype,

    _init: function(mode) {
        PanelMenu.Button.prototype._init.call(this, 0.0);

        this._icon = new St.Icon({ icon_name: 'changes-allow-symbolic',
                                   icon_type: St.IconType.FULLCOLOR,
                                   icon_size: Main.panel.button.height });
        this.actor.set_child(this._icon);

        item = new PopupMenu.PopupSeparatorMenuItem();
        this._vpnSwitch = new PopupMenu.PopupSwitchMenuItem(_("OpenVPN"), false);
        this.menu.addMenuItem(this._vpnSwitch);

        item = new PopupMenu.PopupSeparatorMenuItem();
        this.menu.addMenuItem(item);

        this._createSubMenu();

        Main.panel._rightBox.insert_actor(this.actor, 1);
        Main.panel._menus.addMenu(this.menu);
    },

    _createSubMenu: function() {
        let item;
        let dir = Gio.file_new_for_path("/etc/openvpn/");
        fileEnum = dir.enumerate_children('standard::*', Gio.FileQueryInfoFlags.NONE, null);

        let vpnConfig = Gio.file_new_for_path("/etc/openvpn/openvpn.conf");
        let fileType = vpnConfig.query_info('standard::*', Gio.FileQueryInfoFlags.NONE, null);

        let target = fileType.get_symlink_target();
        global.log("The vpn config real path is: " + target);

        while ((info = fileEnum.next_file(null)) != null) {
            let fileType = info.get_file_type();
            let name = info.get_name();

            match = name.match(/([\w\d-]+)(.ovpn$)/);
            if (match != null) {
                item = new PopupMenu.PopupMenuItem(match[1]);
                item.connect('activate', Lang.bind(this, this._onVpnMenuActivate, name));
                this.menu.addMenuItem(item);

                if (name == target) {
                    item.setShowDot(true);
                }
            }
        }
    },

    _onVpnMenuActivate: function(item, event, name) {
    },
};

function main(extensionMeta) {

    let userExtensionLocalePath = extensionMeta.path + '/locale';
    Gettext.bindtextdomain("vpn-indicator", userExtensionLocalePath);
    Gettext.textdomain("vpn-indicator");

    new VpnIndicator(false);
}

