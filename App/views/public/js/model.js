/***
   *   @author Erick Eduardo - Accon Software Corporativo
   *   @access public
   *   @exemple  METHOD CREATE LOCAL STORAGE
   *
   **/
      function __SETLocalStorage(NAME, OBJECT){
                    localStorage.setItem(NAME,JSON.stringify(OBJECT));
      }
/***
   *   @author Erick Eduardo - Accon Software Corporativo
   *   @access public
   *   @exemple  METHOD GET LOCAL STORAGE
   *
   **/
      function __GETLocalStorage(STORAGE){
                      return JSON.parse(localStorage.getItem(STORAGE));
      }
/***
   *   @author Erick Eduardo - Accon Software Corporativo
   *   @access public
   *   @exemple  METHOD DE ADIÇÃO AO LOCALSTORAGE
   *
   **/
      function __AddLocalStorage(OBJECT,STORAGE){

            
                  var getStorage   = __GETLocalStorage(STORAGE); 
                      getStorage.splice(getStorage.length+1, 0, OBJECT);
                                                    
                       __SETLocalStorage(STORAGE,getStorage);

      }
/***
   *   @author Erick Eduardo - Accon Software Corporativo
   *   @access public
   *   @exemple  METHOD DE EXCLUSÃO AO LOCALSTORAGE
   *
   **/
      function __RemoveLocalStorage(VALUE,STORAGE){
                
                  var getStorage   = __GETLocalStorage(STORAGE); 
                    
                     for(i = 0; i < getStorage.length; i++){
                                    
                                if(getStorage[i].PK == VALUE){
                                    
                                        getStorage.splice(i, 1);
                                        __SETLocalStorage(STORAGE,getStorage);
                                  }                           
                    }
                
}



  /*** * 
       * @author Erick Eduardo - Accon Software Corporativo 
       * @access public 
       * @exemple METHOD DE UPDATE 
       * 
       **/
  
  function __SyncLocalStorage(RESPONSE,STORAGE){ 

        var getStorage = __GETLocalStorage(STORAGE);
       
         for(i = 0; i < getStorage.length; i++){ 

              if(getStorage[i].ID == RESPONSE.ID){ 
      
              
                  getStorage.splice(i, 1); 
                  getStorage.splice(i, 0, RESPONSE);
               }
         }  
                 __SETLocalStorage(STORAGE,getStorage);
 }