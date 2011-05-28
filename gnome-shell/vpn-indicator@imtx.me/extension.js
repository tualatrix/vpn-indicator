const St = imports.gi.St;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const PanelMenu = imports.ui.panelMenu;
const Shell = imports.gi.Shell;
const Lang = imports.lang;

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

        Main.panel._rightBox.insert_actor(this.actor, 1);
        Main.panel._menus.addMenu(this.menu);
    },
};

function main(extensionMeta) {

    let userExtensionLocalePath = extensionMeta.path + '/locale';
    Gettext.bindtextdomain("vpn-indicator", userExtensionLocalePath);
    Gettext.textdomain("vpn-indicator");

    new VpnIndicator(false);
}

