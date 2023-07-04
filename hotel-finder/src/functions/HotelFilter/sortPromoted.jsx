const sortPromoted = (init) => {
    init.sort((a, b) => {
      if (a.promoted && !b.promoted) {
        return -1;
      }

      if (!a.promoted && b.promoted) {
        return 1;
      }
    });

    return init;
}

export default sortPromoted;