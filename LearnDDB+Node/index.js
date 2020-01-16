<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Test</title>
    <link rel="stylesheet" type="text/css" href="/css/style.css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300' rel='stylesheet' type='text/css'>
  </head>
  <body>
    <div class="container">
      <fieldset>
        <form action="/" method="post">
          <input name="newFortune" type="text" class="ghost-input" placeholder="Enter a new Fortune" required>
          <input type="submit" class="ghost-button" value="Save Fortune">
        </form>
        <form action="/get" method="post">
          <input name="getFortune" type="hidden" class="ghost-input" placeholder="Get a Fortune" required>
          <input type="submit" class="ghost-button" value="Get Fortune">
        </form>
        <% if(fortune !== null){ %>
          <p><%= fortune %></p>
        <% } %>

        <% if(error !== null){ %>
          <p><%= error %></p>
        <% } %>
      </fieldset>
    </div>
  </body>
</html>
