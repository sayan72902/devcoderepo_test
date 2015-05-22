Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        //Write app code here
        console.log("Hello World");
        this._loadData();
        console.log("What is This?" , this);
        
        

        //API Docs: https://help.rallydev.com/apps/2.0/doc/
    },
    
    _loadData: function(){
        
        console.log("inside data block");
        
        var MyStore = Ext.create('Rally.data.wsapi.Store', {
            
            model: "User Story",
            
            autoLoad: true ,
            
            listeners: {
                load: function(myStore,myData,success){
                    console.log("My Store is" , myStore);
                    console.log("My Data is" , myData);
                    
                    this._loadDataGrid(myStore);
                },
                scope: this
            },
            
            filters: [
                {
                    property: "c_KanbanState",
                    operator: "=",
                    value:    "Accepted"
                }
                
                
            ],
            
            context: this.getContext().getProject()._ref,
            
            fetch: ["FormattedID", "Name", "Feature", "Owner", "InProgressDate", "ScheduleState" , "c_KanbanState"]  
        });
    },
    
    _loadDataGrid: function(myDataStore){
        
        var myGrid = Ext.create("Rally.ui.grid.Grid", {
            store: myDataStore,
            columnCfgs: ["FormattedID", "Name", "Feature", "Owner", "InProgressDate", "ScheduleState" , "c_KanbanState"]
        });
        
        this.add(myGrid);
    }
});
