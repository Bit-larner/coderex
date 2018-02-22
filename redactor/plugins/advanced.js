$.Redactor.prototype.advanced = function()
    {
        return {
            getTemplate: function()
            {                
                return String()
                + '<section id="redactor-modal-advanced" class="eqneditor"></section>';
            },
            init: function ()
            {
                var button = this.button.add('advanced', 'Math Equations');
                this.button.addCallback(button, this.advanced.show);
                
                
            },
            show: function()
            {                
                this.modal.addTemplate('advanced', this.advanced.getTemplate());     
                this.modal.load('advanced', 'Math Equations', 400);     
                this.modal.createCancelButton();     
                var button = this.modal.createActionButton('Insert');
                button.on('click', this.advanced.insert);
     
                this.selection.save();
                this.modal.show();
     
                $('#mymodal-textarea').focus();
                
            },
            insert: function()
            {
                var html = $('.test').html();
     
                this.modal.close();
                this.selection.restore();
     
                this.insert.html(html);
     
                this.code.sync();
     
            }
        };
    };