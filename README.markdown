# Better way to do file uploads in HTML

Take some of pain out of input[type=file] HTML tag

###Problem:
Webkit based browsers have a nice way to render the &lt;input type="file" /> HTML tag in that it doesn't the full directory of the file you are uploading &mdash; only the file name itself. Displaying the entire directory path is an annoyance as it doesn't give you immediate feedback that you've selected the correct file name. So you have to grab the mouse and select inside the field and scroll all the way over to the right.

###Solution:
There have been a decent number of solutions for making the input[type=file] nicer. I liked Shaun Inman's <a href="http://www.shauninman.com/archive/2007/09/10/styling_file_inputs_with_css_and_the_dom" target="_blank">approach</a> best; however, it was more about button styling and I wanted that plus filename only,remove, and add another link. Hence the <a href="http://github.com/minimul/filecabinet" target="_blank">FileCabinet</a> class ( <a href="http://prototypejs.org" target="_blank">Prototype.js</a> based ).

Fig. 3 FileCabinet rendering of  &lt;input type="file" /> **Better, much better**

![Filecabinet rendering of file upload HTML tag](/images/filecabinet.png)

###HTML and CSS prerequisites.

Required HTML. You need to have a bit of HTML that defines the "add an attachment" action. For example.

<pre>
<code class="html">
&lt;span id=&quot;addAttachment&quot;&gt;Add an attachment&lt;/span&gt;
</code>
</pre>

Required CSS.

<pre>
<code class="css">

      input.uploadFields {
        height:100%;
        opacity: 0;
        position: relative;
        width:auto;
        -moz-opacity: 0;
        filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);
      }

      span.fileCabinet{
        width: 79px;
        height: 22px;
        background: url(btn-choose-file.gif) 0 0 no-repeat;
        display: block;
        overflow: hidden;
        cursor: pointer;
      }
</code>
</pre>

###Usage:

<pre>
<code class="javascript">
    &lt;script>
      document.observe( 'dom:loaded',function(){
        new FileCabinet('addAttachment');
      });
    &lt;/script>
</code>
</pre>

####Options:
There are two options:

**tableWidth:**

  <pre><code class="javascript">new FileCabinet('addAttachment',{ tableWidth: 40 });</code></pre>
  Default is 100% e.g. Defines in percentage the width of the table row each new row.

**newElClassName:**

  <pre><code class="javascript">new FileCabinet('addAttachment',{ newElClassName: 'fileCabRow' });</code></pre>
  Default is "row" e.g. Defines the class name for each new row. You may want something more descriptive if the class name of "row" is too generic and conflicts with other CSS rules.

### Final Notes:
- Demo is <a href="http://minimul.com/demo/filecabinet/index.html" target="_blank">here</a>.
- Code is <a href="http://github.com/minimul/filecabinet" target="_blank">here</a>.
- Tested in IE 6+,Firefox 3,Chrome 4,Safari 4
