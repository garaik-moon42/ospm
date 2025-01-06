/*
 * List Box Helper Class.
 * Created by: Akos Baraz (akos.baraz@arvato-systems.hu)
 *
 * This listbox helper provides some extra functionality
 * for the listboxes (select objects) of the HTML forms.
 * Every listbox can contain numerous elements. The position
 * of the elements is zero-based. This code suppose that the
 * listbox can have only one item selected, the behaviour for
 * the multiple selected items is undeterminate.
 */

/*
 * Creates a new instance of ListBoxHelper for the given
 * list box object (select object).
 */
function ListBoxHelper ( theListBox )
{
	/*
		Class variables
	 */
	this.listctrl = theListBox;

	/*
		Prototype initializator
	 */
	if ( typeof( _ListBoxHelper_prototype_ ) == 'undefined' )
	{
		_ListBoxHelper_prototype_ = true;

		ListBoxHelper.prototype.countItem = countItem;

		ListBoxHelper.prototype.addItem = addItem;
		ListBoxHelper.prototype.insertItem = insertItem;
		ListBoxHelper.prototype.addDistinctItem = addDistinctItem;

		ListBoxHelper.prototype.selectItem = selectItem;
		ListBoxHelper.prototype.selectAll = selectAll;
		ListBoxHelper.prototype.deselectItem = deselectItem;
		ListBoxHelper.prototype.deselectAll = deselectAll;
		ListBoxHelper.prototype.isSelected = isSelected;
		ListBoxHelper.prototype.getSelected = getSelected;
		ListBoxHelper.prototype.getAllSelected = getAllSelected;

		ListBoxHelper.prototype.getText = getText;
		ListBoxHelper.prototype.getValue = getValue;

		ListBoxHelper.prototype.modifyItem = modifyItem;
		ListBoxHelper.prototype.deleteItem = deleteItem;
        ListBoxHelper.prototype.deleteAllSelectedItems = deleteAllSelectedItems;
        ListBoxHelper.prototype.deleteAll = deleteAll;

		ListBoxHelper.prototype.moveItemUp = moveItemUp;
		ListBoxHelper.prototype.moveItemDown = moveItemDown;

		ListBoxHelper.prototype.moveSelectedTo = moveSelectedTo;
	}

	// Member functions

	/*
	 * Gives back the number of the contained items.
	 */
	function countItem ( )
	{
		return this.listctrl.length;
	}

	/*
	 * Adds a new item to the listbox at the end.
	 */
	function addItem ( item, value )
	{
		return this.insertItem( item, value, this.listctrl.length );
	}

	/*
	 * Inserts a new item to the given position.
	 */
	function insertItem ( item, value, pos )
	{
		if ( typeof( value ) == 'undefined' )
			value = item;
		if ( typeof( pos ) == 'undefined' )
			pos = this.listctrl.length;

		New = new Option( item );
		ppos = ( this.listctrl.length < pos ) ? ( this.listctrl.length ) : ( pos );
		ppos = ( ppos > 0 ) ? ppos : 0;
		for ( ipos = this.listctrl.length - 1; ipos >= ppos; ipos-- )
		{
			this.listctrl.options[ ipos + 1 ] = new Option( this.listctrl.options[ ipos ].text );
			this.listctrl.options[ ipos + 1 ].value = this.listctrl.options[ ipos ].value;
		}

		this.listctrl.options[ ppos ] = New;
		this.listctrl.options[ ppos ].value = value;
		return ppos;
	}

	/*
	 * Adds a new item to the listbox if it does not contain the given item.
	 */
	function addDistinctItem ( item, value )
	{
		if ( typeof( value ) == 'undefined' )
		{
			value = item;
        }
        var inList = false;
        for ( i = 0; i < this.listctrl.options.length; i++ )
        {
            if ( value == this.listctrl.options[i].value )
            {
                inList = true;
                break;
            }
        }
	    if ( inList )
	    {
	        return -1;
	    }
	    else
	    {
		    return this.insertItem( item, value, this.listctrl.length );
        }
	}

	/*
	 * Gives back the text value of the item
	 * at the given position.
	 * Position is 0-based.
	 */
	function getText ( pos )
	{
		if ( ( typeof( pos ) == 'undefined' ) ||
			 ( pos >= this.listctrl.length ) ||
			 ( pos < 0 ) )
			return;

		return this.listctrl.options[ pos ].text;
	}

	/*
	 * Gives back the value of the item
	 * at the given position.
	 * Position is 0-based.
	 */
	function getValue ( pos )
	{
		if ( ( typeof( pos ) == 'undefined' ) ||
			 ( pos >= this.listctrl.length ) ||
			 ( pos < 0 ) )
			return;

		return this.listctrl.options[ pos ].value;
	}

	/*
     * Returns true if the item at the given
	 * position is selected, false otherwise.
	 */
	function isSelected ( pos )
	{
		return ( this.listctrl.selectedIndex != pos );
	}

	/*
	 * Makes the item at the given position selected.
	 */
	function selectItem ( pos )
	{
		if ( ( typeof( pos ) == 'undefined' ) ||
			 ( pos >= this.listctrl.length ) ||
			 ( pos < 0 ) )
		{
			return false;
		}

		this.listctrl.options[ pos ].selected = true;
		return true;
	}

	/*
	 * Selects all items if the select control allows multiple selection.
	 */
	function selectAll ( )
	{
	    if ( this.listctrl.multiple )
	    {
	        for (var i = 0; i < this.listctrl.length; ++i )
	        {
	            this.selectItem( i );
	        }
	    }
	}

    /*
	 * Deselects the item at the given position.
	 */
	function deselectItem ( pos )
	{
		if ( ( typeof( pos ) == 'undefined' ) ||
			 ( pos >= this.listctrl.length ) ||
			 ( pos < 0 ) )
		{
			return false;
		}

		this.listctrl.options[ pos ].selected = false;
		return true;
	}

	/*
	 * Deselects all items.
	 */
    function deselectAll ( )
    {
	    if ( this.listctrl.multiple )
	    {
	        for ( var i = 0; i < this.listctrl.length; ++i )
	        {
	            this.deselectItem( i );
	        }
	    }
	    else
	    {
	        this.listctrl.selectedIndex = -1;
        }
    }

	/*
	 * Returns the position of the selected item.
	 * If the listbox allows multiple selection the
	 * return value is undeterminated.
	 */
	function getSelected ( )
	{
		return this.listctrl.selectedIndex;
	}

    /*
     * Returns an array with the positions of the selected items.
     * Positions are 0-based.
     */
    function getAllSelected()
    {
        var selectedItems = new Array();
        var elementCounter = 0;
        for(var i = 0; i < this.listctrl.length; i++)
        {
            if (this.listctrl.options[i].selected)
            {
                selectedItems[elementCounter] = i;
                elementCounter++;
            }
        }
        return selectedItems;
    }

	/*
     * Modifies the item at the given position with the
	 * new text and value.
	 */
	function modifyItem( text, value, pos )
	{
		if ( typeof( value ) == 'undefined' )
			value = item;

		if ( ( typeof( pos ) == 'undefined' ) ||
			 ( pos >= this.listctrl.length ) ||
			 ( pos < 0 ) )
			return;

		this.listctrl.options[ pos ].text = text;
		this.listctrl.options[ pos ].value = value;
	}

	/*
     * Deletes the item at the given position.
	 * Position is 0-based.
	 */
	function deleteItem( pos )
	{
		if ( ( typeof( pos ) == 'undefined' ) ||
			 ( pos >= this.listctrl.length ) ||
			 ( pos < 0 ) )
			return;

		this.listctrl.options[ pos ] = null;
	}

    /*
     * Deletes all selected items from the listbox;
     */
	function deleteAllSelectedItems()
	{
	    var selectedItems = this.getAllSelected();
        if (selectedItems.length > 0)
        {
            this.deleteItem(selectedItems[0]);
            this.deleteAllSelectedItems();
        }
	}

	/*
     * Deletes all items of the listbox.
	 */
	function deleteAll()
	{
		this.listctrl.length = 0;
	}

	/*
	 * Moves up the item at the given position
	 * with one position.
	 * Position is 0-based.
	 */
	function moveItemUp( pos )
	{
		if ( ( typeof( pos ) == 'undefined' ) ||
			 ( pos >= this.listctrl.length ) ||
			 ( pos < 0 ) )
			return;

		if ( pos >= 1 )
		{
			temp = this.listctrl.options[ pos ].text;
			this.listctrl.options[ pos ].text = this.listctrl.options[ pos - 1 ].text;
			this.listctrl.options[ pos - 1 ].text = temp;

			temp = this.listctrl.options[ pos ].value;
			this.listctrl.options[ pos ].value = this.listctrl.options[ pos - 1 ].value;
			this.listctrl.options[ pos - 1 ].value = temp;

			temp = this.listctrl.options[ pos ].selected;
			this.listctrl.options[ pos ].selected = this.listctrl.options[ pos - 1 ].selected;
			this.listctrl.options[ pos - 1 ].selected = temp;
		}
	}

	/*
	 * Moves down the item at the given position
	 * with one position.
	 * Position is 0-based.
	 */
	function moveItemDown( pos )
	{
		if ( ( typeof( pos ) == 'undefined' ) ||
			 ( pos >= this.listctrl.length ) ||
			 ( pos < 0 ) )
			return;

		if ( pos != this.listctrl.options.length - 1 )
		{
			temp = this.listctrl.options[ pos ].text;
			this.listctrl.options[ pos ].text = this.listctrl.options[ pos + 1 ].text;
			this.listctrl.options[ pos + 1 ].text = temp;

			temp = this.listctrl.options[ pos ].value;
			this.listctrl.options[ pos ].value = this.listctrl.options[ pos + 1 ].value;
			this.listctrl.options[ pos + 1 ].value = temp;

			temp = this.listctrl.options[ pos ].selected;
			this.listctrl.options[ pos ].selected = this.listctrl.options[ pos + 1 ].selected;
			this.listctrl.options[ pos + 1 ].selected = temp;
		}
	}

	/*
	 * Moves the selected item to another ListBoxHelper
	 * instance.
	 */
	function moveSelectedTo( lbHelper )
	{
		pos = this.getSelected();
		if ( pos == -1 )
			return false;

		text = this.getText( pos );
		value = this.getValue( pos );
		this.deleteItem( pos );
		if ( pos >= this.countItem() )
			this.selectItem( pos - 1 );
		else
			this.selectItem( pos );

		lbHelper.selectItem( lbHelper.addItem( text, value ) );
	}
}
